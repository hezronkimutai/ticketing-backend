import prisma from '../prisma/client';

type Status = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export const createUser = async (
  userData: {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
    status: Status
  }
) => {
  return prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      verified: userData.verified,
      status: userData.status,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};
//get user by email
export const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};




export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { events: true, tickets: true }, // Include related data
  });
};

export const updateUser = async (id: string, data: Partial<{
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
