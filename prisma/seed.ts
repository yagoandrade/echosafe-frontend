import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const randomPassword = crypto.randomBytes(64).toString("hex");
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(randomPassword, salt);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: "tester_account-yQ$Yk4yM9ahDNR$s@tester-email.com",
    },
  });

  if (existingUser) {
    throw new Error("Test user already exists!");
  }

  await prisma.user.create({
    data: {
      id: "clucyx0fq0000r43oxr3dn1nq",
      name: "tester_n1ckel",
      email: "tester_account-yQ$Yk4yM9ahDNR$s@tester-email.com",
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
