import { Request, Response, Router } from "express";
import { getAllTickets, createTicket } from "../services/ticket.service";
import { checkValidationResults } from '../middlewares/validators/index'

const router: Router = Router();

router.get("/", checkValidationResults, async (_req: Request, res: Response) => {
  const tickets = await getAllTickets();
  res.json(tickets);
});

router.post("/", checkValidationResults, async (req, res) => {
  const newTicket = await createTicket(req.body);
  res.json(newTicket);
});

export default router;
