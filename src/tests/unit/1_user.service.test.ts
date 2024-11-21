import prisma from '../../prisma/client';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../../services/user.service';

type Status = 'ACTIVE' | 'INACTIVE' | 'DELETED'

describe('User Service with Real Database', () => {
    beforeAll(async () => {

    });

    const userData: {
        firstName: string,
        lastName: string,
        email: string,
        verified: boolean,
        status: Status
    } = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe3@example.com',
        verified: true,
        status: 'ACTIVE',
    };

    it('should create a new user', async () => {
        const user = await createUser(userData);
        expect(user).toMatchObject(userData);
    });

    it('should fetch all users', async () => {
        const users = await getAllUsers();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should fetch a user by ID', async () => {
        const user = await createUser({ ...userData, email: 'new@example.com' });
        const fetchedUser = await getUserById(user.id);
        expect(fetchedUser).toMatchObject({ email: 'new@example.com' });
    });

    it('should update a user', async () => {
        const user = await createUser({ ...userData, email: 'update@example.com' });
        const updatedUser = await updateUser(user.id, { firstName: 'Jane' });
        expect(updatedUser.firstName).toBe('Jane');
    });

    it('should delete a user', async () => {
        const user = await createUser({ ...userData, email: 'delete@example.com' });
        const deletedUser = await deleteUser(user.id);
        expect(deletedUser).toMatchObject({ email: 'delete@example.com' });
    });

    afterAll(async () => {

        await prisma.$disconnect();
    });
});
