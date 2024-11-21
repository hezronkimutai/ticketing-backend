import prisma from '../prisma/client';
import { createTicketCategory, getAllTicketCategories, getTicketCategoryById, updateTicketCategory, deleteTicketCategory } from '../services/ticketCategory.service';
import { createEvent } from '../services/event.service'; // Assuming event creation is in this service
import { createUser } from '../services/user.service';

let testUser: any;
type Status = 'ACTIVE' | 'INACTIVE' | 'DELETED'

const userData: {
  firstName: string,
  lastName: string,
  email: string,
  verified: boolean,
  status: Status
} = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.oe6@example.com',
  verified: true,
  status: 'ACTIVE',
};

const eventData = {
  name: 'Music Festival',
  description: 'A grand music festival',
  category: 'Music',
  userId: '',
  startDate: new Date('2024-12-01'),
  endDate: new Date('2024-12-03'),
  startTime: new Date('2024-12-01T18:00:00Z'),
  endTime: new Date('2024-12-01T23:00:00Z'),
  venue: 'Stadium',
  address: '123 Main St',
  city: 'Nairobi',
  state: null,
  country: 'Kenya',
  latitude: -1.286389,
  longitude: 36.817223,
  ticketPrice: 50,
  currency: 'USD',
  ticketLimit: 1000,
  ticketType: 'VIP',
  status: 'ACTIVE',
  visibility: 'PUBLIC',
  bannerUrl: null,
  thumbnailUrl: null,
  isFeatured: true,
  ageRestriction: null,
  refundPolicy: 'No refunds',
  capacity: 5000,
  contactEmail: 'info@musicfest.com',
  contactPhone: '+254700000000',
};
describe('Ticket Category Service with Real Database', () => {
  let testEvent: any;
  let ticketCategoryData: { eventId: string, name: string, price: any };

  beforeAll(async () => {
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();
    testUser = await createUser(userData);
    await prisma.ticketCategory.deleteMany();
    await prisma.event.deleteMany();
    eventData.userId = testUser.id;

    testEvent = await createEvent(eventData);

    ticketCategoryData = {
      eventId: testEvent.id,
      name: 'VIP Ticket',
      price: 100,
    };
  });

  it('should create a new ticket category', async () => {
    const ticketCategory = await createTicketCategory(ticketCategoryData);
    expect(ticketCategory.id).toBeDefined();
  });

  it('should fetch all ticket categories', async () => {
    const ticketCategories = await getAllTicketCategories();
    expect(ticketCategories.length).toBe(1);
  });

  it('should fetch a ticket category by ID', async () => {
    const ticketCategories = await getAllTicketCategories();
    const ticketCategory = await getTicketCategoryById(ticketCategories[0].id);
    expect(ticketCategory).toBeDefined();
    expect(ticketCategory?.name).toBe(ticketCategoryData.name);
  });

  it('should update a ticket category', async () => {
    const ticketCategories = await getAllTicketCategories();
    const updatedCategory = await updateTicketCategory(ticketCategories[0].id, { name: 'Updated VIP Ticket' });
    expect(updatedCategory.name).toBe('Updated VIP Ticket');
  });

  it('should delete a ticket category', async () => {
    const ticketCategories = await getAllTicketCategories();
    const deletedCategory = await deleteTicketCategory(ticketCategories[0].id);
    expect(deletedCategory).toMatchObject({ name: 'Updated VIP Ticket' });

    const remainingCategories = await getAllTicketCategories();
    expect(remainingCategories.length).toBe(0);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
