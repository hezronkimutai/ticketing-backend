import { Router, Request, Response } from "express";
import { getAllUsers, createUser } from "../services/user.service";
import { checkValidationResults } from '../middlewares/validators/index'
import { signupValidator } from '../middlewares/validators/user'

const router: Router = Router();

router.get("/", checkValidationResults, async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", signupValidator, checkValidationResults, async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
