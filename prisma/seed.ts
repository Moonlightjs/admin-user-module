import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
const prisma = new PrismaClient();

const defaultSuperAdminPolicyId = crypto.randomUUID();
const seed = async () => {
  try {
    await addListDefaultPolicies();
    await addListDefaultRoles();
    await addUserSuperAdmin();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const addListDefaultPolicies = async () => {
  await prisma.$transaction([
    prisma.adminPolicy.create({
      data: {
        id: defaultSuperAdminPolicyId,
        name: 'Super Admin',
        isSystem: true,
        version: '2023-04-13',
        statements: [
          {
            Effect: 'Allow',
            Action: ['*'],
            Resource: ['*'],
          },
        ],
      },
    }),
  ]);
  console.log('add list default permissions success');
};

const addListDefaultRoles = async () => {
  await prisma.$transaction([
    prisma.adminRole.upsert({
      create: {
        code: 'super_admin',
        name: 'Super Admin',
        policies: {
          connect: [
            {
              id: defaultSuperAdminPolicyId,
            },
          ],
        },
      },
      where: {
        code: 'super_admin',
      },
      update: {},
    }),
  ]);
  console.log('add list default role success');
};

const addUserSuperAdmin = async () => {
  const password = '!admin@123';
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  await prisma.adminUser.upsert({
    create: {
      username: 'super_admin',
      password: passwordHash,
      firstName: 'admin',
      middleName : '',
      lastName   : 'super',
      displayName  : 'Super Admin',
      phoneNumber: '+8425041199',
      email         : 'superadmin@moonlightjs.com',
      resetPasswordToken : null,
      registrationToken : null,
      lastLogin          : null,
      verifiedAt        : new Date(),
      isRequiredVerify  : false,
      isActive         : true,
      blocked          : false,
      roles: {
        connect: {
          code: 'super_admin',
        },
      },
    },
    where: {
      username: 'superadmin',
    },
    update: {},
  });
  console.log('add user super admin');
};

seed().then();
