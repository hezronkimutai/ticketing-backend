import { Request, Response, Router } from "express";
import { getAllTickets, createTicket } from "../services/ticket.service";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const users = await getAllTickets();
  res.json(users);
});

router.post("/", async (req, res) => {
  const newUser = await createTicket(req.body);
  res.json(newUser);
});

export default router;
