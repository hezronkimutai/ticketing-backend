import { request } from '..';
import prisma from '../../prisma/client';
import { createUser } from '../../services/user.service';
import { createEvent } from '../../services/event.service';

describe('Ticket Category API with Real Database', () => {
    let testUser: any;
    let testEvent: any;

    type Status = 'ACTIVE' | 'INACTIVE' | 'DELETED'

    const userData: {
        firstName: string,
        lastName: string,
        email: string,
        verified: boolean,
        status: Status
    } = {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        verified: true,
        status: 'ACTIVE',
    };

    const eventData = {
        name: 'Food Carnival',
        description: 'A grand food festival',
        category: 'Food',
        userId: '',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-03'),
        startTime: new Date('2024-11-01T10:00:00Z'),
        endTime: new Date('2024-11-01T20:00:00Z'),
        venue: 'City Square',
        address: '789 Market Lane',
        city: 'Kisumu',
        state: null,
        country: 'Kenya',
        latitude: -0.0917,
        longitude: 34.7679,
        ticketPrice: 10,
        currency: 'USD',
        ticketLimit: 2000,
        ticketType: 'GENERAL',
        status: 'ACTIVE',
        visibility: 'PUBLIC',
        bannerUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        ageRestriction: null,
        refundPolicy: 'No refunds',
        capacity: 10000,
        contactEmail: 'info@foodcarnival.com',
        contactPhone: '+254702345678',
    };

    const ticketCategoryData = {
        eventId: '',
        name: 'VIP',
        price: 50,
    };

    beforeAll(async () => {
        testUser = await createUser(userData);
        eventData.userId = testUser.id;
        testEvent = await createEvent(eventData);
        ticketCategoryData.eventId = testEvent.id;
    });

    it('should create a new ticket category via POST /api/ticket-categories', async () => {
        const response = await request.post('/api/ticket-categories').send(ticketCategoryData);
        expect(response.status).toBe(200);
    });

    it('should fetch all ticket categories via GET /api/ticket-categories', async () => {
        const response = await request.get('/api/ticket-categories');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('tickets'); // Verify relation with tickets
        expect(response.body[0]).toHaveProperty('event');   // Verify relation with event
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
