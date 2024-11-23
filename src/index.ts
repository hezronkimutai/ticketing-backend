import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';
import userRoutes from "./routes/user.routes";
import eventRoutes from "./routes/event.routes";
import ticketRoutes from "./routes/ticket.routes";
import ticketCategoriesRoutes from "./routes/ticketCategories.routes";
import { generateReceipt } from './utils/pdfGenerator'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", async (req: any, res: any) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ticket-categories", ticketCategoriesRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
