import { prisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/common/utils/password.js";
import { UserRole } from "../src/generated/prisma/client.js";

const requiredEnv = (key: string): string => {
  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing required seed env variable: ${key}`);
  }

  return value;
};

const credentials = {
  superAdmin: {
    fullName: requiredEnv("SEED_SUPER_ADMIN_FULL_NAME"),
    email: requiredEnv("SEED_SUPER_ADMIN_EMAIL"),
    password: requiredEnv("SEED_SUPER_ADMIN_PASSWORD"),
    countryCode: requiredEnv("SEED_SUPER_ADMIN_COUNTRY_CODE"),
    contactNumber: requiredEnv("SEED_SUPER_ADMIN_CONTACT_NUMBER"),
  },
} as const;

async function main() {
  const superAdminHash = await hashPassword(credentials.superAdmin.password);

  await prisma.user.upsert({
    where: { email: credentials.superAdmin.email },
    update: {
      fullName: credentials.superAdmin.fullName,
      passwordHash: superAdminHash,
      role: UserRole.SUPER_ADMIN,
      createdByUserId: null,
      countryCode: credentials.superAdmin.countryCode,
      contactNumber: credentials.superAdmin.contactNumber,
      isActive: true,
    },
    create: {
      fullName: credentials.superAdmin.fullName,
      email: credentials.superAdmin.email,
      passwordHash: superAdminHash,
      role: UserRole.SUPER_ADMIN,
      countryCode: credentials.superAdmin.countryCode,
      contactNumber: credentials.superAdmin.contactNumber,
    },
  });

  console.table([
    { app: "dashboard", role: "SUPER_ADMIN", ...credentials.superAdmin },
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
