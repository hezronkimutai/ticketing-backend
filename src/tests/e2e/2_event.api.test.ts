import { request } from '..';
import prisma from '../../prisma/client';
import { createUser } from '../../services/user.service';

describe('Event API with Real Database', () => {
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
        email: 'john.de@example.com',
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

    beforeAll(async () => {

        testUser = await createUser(userData);
        eventData.userId = testUser.id;
    });

    it('should create a new event via POST /api/events', async () => {
        const response = await request.post('/api/events').send(eventData);
        expect(response.status).toBe(200);

    });

    it('should fetch all events via GET /api/events', async () => {
        const response = await request.get('/api/events');
        expect(response.status).toBe(200);
    });

    afterAll(async () => {

        await prisma.$disconnect();
    });
});
