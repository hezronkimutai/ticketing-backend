import prisma from '../../prisma/client';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../../services/event.service';
import { createUser } from '../../services/user.service';

describe('Event Service with Real Database', () => {
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
        email: 'john.do@example.com',
        verified: true,
        status: 'ACTIVE',
    };

    beforeAll(async () => {

        testUser = await createUser(userData);

    });

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

    beforeEach(() => {
        eventData.userId = testUser.id;
    });

    it('should create a new event', async () => {
        const event = await createEvent(eventData);
        expect(event.id).toBeDefined();
    });

    it('should fetch all events', async () => {
        const events = await getAllEvents();
        expect(events.length).toBeGreaterThan(0);
    });

    it('should fetch an event by ID', async () => {
        const events = await getAllEvents();
        const event = await getEventById(events[0].id);
        expect(event).toBeDefined();
    });

    it('should update an event', async () => {
        const events = await getAllEvents();
        const updatedEvent = await updateEvent(events[0].id, { name: 'Updated Music Festival' });
        expect(updatedEvent.name).toBe('Updated Music Festival');
    });

    it('should delete an event', async () => {
        const events = await getAllEvents();
        const deletedEvent = await deleteEvent(events[0].id);
        expect(deletedEvent).toMatchObject({ name: 'Updated Music Festival' });

        const remainingEvents = await getAllEvents();
        expect(remainingEvents.length).toBe(events.length - 1);
    });

    afterAll(async () => {

        await prisma.$disconnect();
    });
});
