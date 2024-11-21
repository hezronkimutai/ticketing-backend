import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } from '../../services/ticket.service';
import { createEvent } from '../../services/event.service';
import { createTicketCategory } from '../../services/ticketCategory.service';
import prisma from '../../prisma/client';

describe('Ticket Service with Real Database', () => {
    let testEvent: any;
    let testTicketCategory: any;
    let testUser: any;
    let ticketData: { userId: string; eventId: string; ticketCategoryId: string; name: string; email: string };

    beforeAll(async () => {


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
            email: 'testuser@example.com',
            verified: true,
            status: 'ACTIVE',
        };
        // Create a test user
        testUser = await prisma.user.create({
            data: userData,
        });
        // Create a test event
        testEvent = await createEvent({
            name: 'Concert',
            description: 'A live music concert',
            category: 'Music',
            userId: testUser.id,
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-02'),
            startTime: new Date('2024-12-01T18:00:00Z'),
            endTime: new Date('2024-12-01T23:00:00Z'),
            venue: 'Stadium',
            address: '123 Main St',
            city: 'Nairobi',
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
            contactEmail: 'info@musicconcert.com',
            contactPhone: '+254700000000',
            state: null
        });

        // Create a test ticket category linked to the test event
        testTicketCategory = await createTicketCategory({
            eventId: testEvent.id,
            name: 'VIP Ticket',
            price: 100,
        });

        ticketData = {
            userId: testUser.id,
            eventId: testEvent.id,
            ticketCategoryId: testTicketCategory.id,
            name: 'Test Ticket User',
            email: 'testuser@example.com',
        };
    });

    it('should create a new ticket', async () => {
        const ticket = await createTicket(ticketData);
        expect(ticket.id).toBeDefined();
    });

    it('should fetch all tickets', async () => {
        const tickets = await getAllTickets();
        expect(tickets.length).toBeGreaterThan(0);
    });

    it('should fetch a ticket by ID', async () => {
        const tickets = await getAllTickets();
        const ticket = await getTicketById(tickets[0].id);
        expect(ticket).toBeDefined();
    });

    it('should update a ticket', async () => {
        const tickets = await getAllTickets();
        const updatedTicket = await updateTicket(tickets[0].id, { name: 'Updated Ticket User' });
        expect(updatedTicket.name).toBe('Updated Ticket User');
    });

    it('should delete a ticket', async () => {
        const tickets = await getAllTickets();
        const deletedTicket = await deleteTicket(tickets[0].id);
        expect(deletedTicket).toMatchObject({ name: 'Updated Ticket User' });

        const remainingTickets = await getAllTickets();
        expect(remainingTickets.length).toBe(tickets.length - 1);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
