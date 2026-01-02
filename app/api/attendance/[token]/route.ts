import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hasTrainingStarted(trainingDate: Date, trainingTime: string) {
  const dateTime = new Date(trainingDate);
  const [hours, minutes] = trainingTime.split(":");
  dateTime.setHours(Number(hours), Number(minutes), 0, 0);
  return dateTime < new Date();
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const training = await prisma.training.findUnique({
    where: { token },
    include: {
      group: {
        include: {
          players: {
            where: { active: true },
          },
        },
      },
    },
  });

  if (!training) {
    return NextResponse.json(
      { error: "Link nie został znaleziony" },
      { status: 404 }
    );
  }

  if (hasTrainingStarted(training.trainingDate, training.trainingTime)) {
    return NextResponse.json(
      { error: "Trening już się rozpoczął" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    trainingDate: training.trainingDate,
    trainingTime: training.trainingTime,
    group: {
      name: training.group.name,
    },
    players: training.group.players,
  });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const { playerId, status } = await request.json();

  if (!playerId || !status) {
    return NextResponse.json(
      { error: "Nieprawidłowe dane zgłoszenia" },
      { status: 400 }
    );
  }

  const training = await prisma.training.findUnique({
    where: { token },
  });

  if (!training) {
    return NextResponse.json({ error: "Training not found" }, { status: 404 });
  }

  const attendance = await prisma.attendance.upsert({
    where: {
      trainingId_playerId: {
        trainingId: training.id,
        playerId,
      },
    },
    update: {
      status,
      updatedAt: new Date(),
    },
    create: {
      trainingId: training.id,
      playerId,
      status,
    },
  });

  return NextResponse.json(attendance);
}
