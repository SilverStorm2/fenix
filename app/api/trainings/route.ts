import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12);

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filter = request.nextUrl.searchParams.get("filter") || "upcoming";
  const now = new Date();

  const trainings = await prisma.training.findMany({
    where: {
      trainingDate:
        filter === "upcoming"
          ? {
              gte: now,
            }
          : {
              lt: now,
            },
    },
    include: {
      group: true,
      _count: { select: { attendance: true } },
    },
    orderBy: {
      trainingDate: filter === "upcoming" ? "asc" : "desc",
    },
  });

  const trainingsWithTotal = await Promise.all(
    trainings.map(async (training) => {
      const totalPlayers = await prisma.player.count({
        where: {
          groupId: training.groupId,
          active: true,
        },
      });

      return { ...training, totalPlayers };
    })
  );

  return NextResponse.json(trainingsWithTotal);
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { trainingDate, trainingTime, groupId, notes } = await request.json();

  const training = await prisma.training.create({
    data: {
      token: nanoid(),
      trainingDate: new Date(trainingDate),
      trainingTime,
      groupId,
      notes,
      createdBy: auth.userId,
    },
  });

  return NextResponse.json(training);
}
