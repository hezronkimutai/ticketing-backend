import { Router } from 'express';
import { getAllUsers, createUser } from '../services/user.service';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const newUser = await createUser(name, email);
  res.json(newUser);
});

export default router;
