import { request } from '..';
import prisma from '../../prisma/client';
import { createUser } from '../../services/user.service';
import { createEvent } from '../../services/event.service';

describe('Ticket API with Real Database', () => {
    let testUser: any;
    let testEvent: any;
    let ticketCategory: any;

    type Status = 'ACTIVE' | 'INACTIVE' | 'DELETED'

    const userData: {
        firstName: string,
        lastName: string,
        email: string,
        verified: boolean,
        status: Status
    } = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        verified: true,
        status: 'ACTIVE',
    };

    const eventData = {
        name: 'Art Expo',
        description: 'An amazing art exhibition',
        category: 'Art',
        userId: '',
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-15'),
        startTime: new Date('2024-12-10T10:00:00Z'),
        endTime: new Date('2024-12-10T18:00:00Z'),
        venue: 'Art Center',
        address: '456 Gallery St',
        city: 'Mombasa',
        state: null,
        country: 'Kenya',
        latitude: -4.043477,
        longitude: 39.668206,
        ticketPrice: 20,
        currency: 'USD',
        ticketLimit: 500,
        ticketType: 'GENERAL',
        status: 'ACTIVE',
        visibility: 'PUBLIC',
        bannerUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        ageRestriction: null,
        refundPolicy: 'No refunds',
        capacity: 2000,
        contactEmail: 'info@artexpo.com',
        contactPhone: '+254701234567',
    };

    const ticketData = {
        userId: '',
        eventId: '',
        ticketCategoryId: '',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
    };

    beforeAll(async () => {


        testUser = await createUser(userData);
        eventData.userId = testUser.id;
        testEvent = await createEvent(eventData);

        // Create a mock ticket category for the event
        ticketCategory = await prisma.ticketCategory.create({
            data: {
                // eventId: testEvent.id,
                // name: 'Standard',
                // description: 'Standard access ticket',
                // price: 20,
                // currency: 'USD',
                // ticketLimit: 500,

                eventId: testEvent.id,
                name: "VIP Ticket",
                price: 100,



            },
        });

        ticketData.userId = testUser.id;
        ticketData.eventId = testEvent.id;
        ticketData.ticketCategoryId = ticketCategory.id;
    });

    it('should create a new ticket via POST /api/tickets', async () => {
        const response = await request.post('/api/tickets').send(ticketData);


        expect(response.status).toBe(200);
    });

    it('should fetch all tickets via GET /api/tickets', async () => {
        const response = await request.get('/api/tickets');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    afterAll(async () => {

        await prisma.$disconnect();
    });
});
