import { TicketCategory } from '@prisma/client';
import prisma from '../prisma/client';



export const createTicketCategory = async (
  ticketCategory: {
    eventId: string,
    name: string,
    price: any
  }
) => {
  return prisma.ticketCategory.create({
    data: {
      eventId: ticketCategory.eventId,
      name: ticketCategory.name,
      price: ticketCategory.price,
    },
  });
};

export const getAllTicketCategories = async () => {
  return prisma.ticketCategory.findMany({
    include: { tickets: true, event: true },
  });
};

export const getTicketCategoryById = async (id: string) => {
  return prisma.ticketCategory.findUnique({
    where: { id },
    include: { tickets: true, event: true },
  });
};

export const updateTicketCategory = async (id: string, data: Partial<TicketCategory>) => {
  return prisma.ticketCategory.update({
    where: { id },
    data,
  });
};

export const deleteTicketCategory = async (id: string) => {
  return prisma.ticketCategory.delete({
    where: { id },
  });
};
