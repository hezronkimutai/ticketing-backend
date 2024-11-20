import prisma from '../prisma/client'

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (name: string, email: string) => {
  return prisma.user.create({
    data: { name, email },
  });
};
