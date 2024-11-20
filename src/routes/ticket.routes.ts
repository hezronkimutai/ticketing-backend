import { Router } from 'express';
import { getAllTickets, createTicket } from '../services/ticket.service';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await getAllTickets();
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await createTicket(req.body);
  res.json(newUser);
});

export default router;
