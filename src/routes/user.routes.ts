import { Router, Request, Response } from "express";
import { getAllUsers, createUser } from "../services/user.service";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
