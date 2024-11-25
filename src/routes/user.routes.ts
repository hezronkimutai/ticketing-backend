import { Router, Request, Response } from "express";
import { getAllUsers, createUser, getUser } from "../services/user.service";
import { checkValidationResults } from "../middlewares/validators/index";
import jwt from "jsonwebtoken";
import { LoginInput } from "../types/auth.types";
import { signupValidator } from "../middlewares/validators/user";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

const router: Router = Router();
// define JWT secret
const secret_key = process.env.JWT_SECRET;
if (!secret_key) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again later.",
});

router.get(
  "/",
  checkValidationResults,
  async (_req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
);

// sign up
router.post(
  "/user/api/signup",
  signupValidator,
  checkValidationResults,
  async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await createUser({
        ...req.body,
        password: hashedPassword,
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

//login
router.post(
  "/user/api/login",
  loginLimiter,
  async (req: Request<{}, {}, LoginInput>, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Fetch the user by email (Implement your own getUser function)
      const user = await getUser(email);
      if (!user) {
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        secret_key,
        {
          expiresIn: "1h",
          algorithm: "HS256",
        }
      );

      // Send token in response
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
);

export default router;
