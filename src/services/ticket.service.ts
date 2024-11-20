import { Ticket } from '@prisma/client';
import prisma from '../prisma/client';


export const createTicket = async (
ticketData:{  userId: string,
  eventId: string,
  ticketCategoryId: string,
  name: string,
  email: string}
) => {
  return prisma.ticket.create({
    data: {
      userId:ticketData.userId,
      eventId:ticketData.eventId,
      ticketCategoryId:ticketData.ticketCategoryId,
      name:ticketData.name,
      email:ticketData.email||"",
    },
  });
};

export const getAllTickets = async () => {
  return prisma.ticket.findMany({
    include: { user: true, event: true, ticketCategory: true },
  });
};

export const getTicketById = async (id: string) => {
  return prisma.ticket.findUnique({
    where: { id },
    include: { user: true, event: true, ticketCategory: true },
  });
};

export const updateTicket = async (id: string, data: Partial<Ticket>) => {
  return prisma.ticket.update({
    where: { id },
    data,
  });
};

export const deleteTicket = async (id: string) => {
  return prisma.ticket.delete({
    where: { id },
  });
};
