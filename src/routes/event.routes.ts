import { Router } from 'express';
import { getAllEvents, createEvent } from '../services/event.service';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await getAllEvents();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const newUser = await createEvent(req.body);
  res.json(newUser);
});

export default router;
