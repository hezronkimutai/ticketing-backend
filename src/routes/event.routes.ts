import { Request, Response, Router } from "express";
import { getAllEvents, createEvent } from "../services/event.service";
import { checkValidationResults } from '../middlewares/validators/index'
const router: Router = Router();

router.get("/", checkValidationResults, async (_req: Request, res: Response) => {
  const events = await getAllEvents();
  res.json(events);
});

router.post("/", checkValidationResults, async (req, res) => {
  const newEvent = await createEvent(req.body);
  res.json(newEvent);
});

export default router;
