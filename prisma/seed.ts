import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  const passwordHash = await bcrypt.hash("password123", 10);

  const coach = await prisma.user.upsert({
    where: { email: "anna.trenerka@fenix.pl" },
    update: {},
    create: {
      email: "anna.trenerka@fenix.pl",
      passwordHash,
      role: "coach",
      firstName: "Anna",
      lastName: "Kowalska",
    },
  });
  console.log("✅ Coach created:", coach.email);

  const group2016 = await prisma.group.upsert({
    where: { id: "fenix-2016" },
    update: {},
    create: {
      id: "fenix-2016",
      name: "FENIX 2016",
      yearBorn: 2016,
      coachId: coach.id,
    },
  });

  const group2014 = await prisma.group.upsert({
    where: { id: "fenix-2014" },
    update: {},
    create: {
      id: "fenix-2014",
      name: "FENIX 2014",
      yearBorn: 2014,
      coachId: coach.id,
    },
  });
  console.log("✅ Groups created: FENIX 2016, FENIX 2014");

  const players2016 = [
    { firstName: "Jan", lastName: "Kowalski", jersey: 7 },
    { firstName: "Anna", lastName: "Nowak", jersey: 10 },
    { firstName: "Piotr", lastName: "Wiśniewski", jersey: 5 },
    { firstName: "Maria", lastName: "Lewandowska", jersey: 3 },
    { firstName: "Tomasz", lastName: "Zieliński", jersey: 11 },
    { firstName: "Katarzyna", lastName: "Szymańska", jersey: 9 },
    { firstName: "Michał", lastName: "Woźniak", jersey: 4 },
    { firstName: "Agnieszka", lastName: "Dąbrowska", jersey: 6 },
  ];

  for (const player of players2016) {
    await prisma.player.upsert({
      where: { id: `player-2016-${player.lastName.toLowerCase()}` },
      update: {},
      create: {
        id: `player-2016-${player.lastName.toLowerCase()}`,
        firstName: player.firstName,
        lastName: player.lastName,
        groupId: group2016.id,
        jerseyNumber: player.jersey,
      },
    });
  }
  console.log(`✅ Created ${players2016.length} players for FENIX 2016`);

  const players2014 = [
    { firstName: "Paweł", lastName: "Kowalczyk", jersey: 2 },
    { firstName: "Ewa", lastName: "Jankowska", jersey: 8 },
    { firstName: "Adam", lastName: "Mazur", jersey: 12 },
  ];

  for (const player of players2014) {
    await prisma.player.upsert({
      where: { id: `player-2014-${player.lastName.toLowerCase()}` },
      update: {},
      create: {
        id: `player-2014-${player.lastName.toLowerCase()}`,
        firstName: player.firstName,
        lastName: player.lastName,
        groupId: group2014.id,
        jerseyNumber: player.jersey,
      },
    });
  }
  console.log(`✅ Created ${players2014.length} players for FENIX 2014`);

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
