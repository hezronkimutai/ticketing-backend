import { Request, Response, Router } from "express";
import {
  getAllTicketCategories,
  createTicketCategory,
} from "../services/ticketCategory.service";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const users = await getAllTicketCategories();
  res.json(users);
});

router.post("/", async (req, res) => {
  const newUser = await createTicketCategory(req.body);
  res.json(newUser);
});

export default router;
