import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await verifyAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const training = await prisma.training.findUnique({
    where: { id },
    include: {
      group: true,
    },
  });

  if (!training) {
    return NextResponse.json({ error: "Training not found" }, { status: 404 });
  }

  const players = await prisma.player.findMany({
    where: {
      groupId: training.groupId,
      active: true,
    },
    include: {
      attendance: {
        where: { trainingId: id },
      },
    },
  });

  const playersWithStatus = players.map((player) => ({
    id: player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    status: player.attendance[0]?.status || "no_response",
    respondedAt: player.attendance[0]?.respondedAt || null,
  }));

  const stats = {
    total: players.length,
    willAttend: playersWithStatus.filter((p) => p.status === "will_attend")
      .length,
    willNotAttend: playersWithStatus.filter(
      (p) => p.status === "will_not_attend"
    ).length,
    noResponse: playersWithStatus.filter((p) => p.status === "no_response")
      .length,
  };

  return NextResponse.json({
    training,
    stats,
    players: playersWithStatus,
  });
}
