import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';

export async function createEvent(eventData: {
  name: string;
  description: string | null;
  category: string;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  venue: string;
  address: string | null;
  city: string;
  state: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  ticketPrice: number;
  currency: string;
  ticketLimit: number | null;
  ticketType: string;
  status: string;
  visibility: string;
  bannerUrl: string | null;
  thumbnailUrl: string | null;
  tags: string[];
  isFeatured: boolean;
  ageRestriction: number | null;
  refundPolicy: string | null;
  capacity: number | null;
  contactEmail: string | null;
  contactPhone: string | null;
}) {
  const event = await prisma.event.create({
    data: {
      name: eventData.name,
      description: eventData.description,
      category: eventData.category,
      userId: eventData.userId,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      venue: eventData.venue,
      address: eventData.address,
      city: eventData.city,
      state: eventData.state,
      country: eventData.country,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      ticketPrice: eventData.ticketPrice,
      currency: eventData.currency,
      ticketLimit: eventData.ticketLimit,
      ticketType: eventData.ticketType,
      status: eventData.status,
      visibility: eventData.visibility,
      bannerUrl: eventData.bannerUrl,
      thumbnailUrl: eventData.thumbnailUrl,
      tags: eventData.tags,
      isFeatured: eventData.isFeatured,
      ageRestriction: eventData.ageRestriction,
      refundPolicy: eventData.refundPolicy,
      capacity: eventData.capacity,
      contactEmail: eventData.contactEmail,
      contactPhone: eventData.contactPhone,
    },
  });

  return event;
}

export const getAllEvents = async () => {
  return prisma.event.findMany({
    include: { user: true, tickets: true },
  });
};

export const getEventById = async (id: string) => {
  return prisma.event.findUnique({
    where: { id },
    include: { user: true, tickets: true },
  });
};

export const updateEvent = async (id: string, data: Prisma.EventUpdateInput) => {
  return prisma.event.update({
    where: { id },
    data,
  });
};

export const deleteEvent = async (id: string) => {
  return prisma.event.delete({
    where: { id },
  });
};
