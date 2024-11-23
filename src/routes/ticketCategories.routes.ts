import { Request, Response, Router } from "express";
import {
  getAllTicketCategories,
  createTicketCategory,
} from "../services/ticketCategory.service";
import { checkValidationResults } from '../middlewares/validators/index'

const router: Router = Router();

router.get("/", checkValidationResults, async (_req: Request, res: Response) => {
  const categories = await getAllTicketCategories();
  res.json(categories);
});

router.post("/", checkValidationResults, async (req, res) => {
  const newCategory = await createTicketCategory(req.body);
  res.json(newCategory);
});

export default router;
