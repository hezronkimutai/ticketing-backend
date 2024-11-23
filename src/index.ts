import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';
import userRoutes from "./routes/user.routes";
import eventRoutes from "./routes/event.routes";
import ticketRoutes from "./routes/ticket.routes";
import ticketCategoriesRoutes from "./routes/ticketCategories.routes";
import {generateStyledPDFWithQRCode} from './utils/pdfGenerator'
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

app.get("/health", async(req: any, res: any) => {
/**
 * Example usage
 */
const content: string = '<p>This is a sample PDF with <strong>HTML styling</strong> and an embedded QR code.</p>';
const qrData: string = 'HEZRON'; // URL or data to be encoded in the QR code
const outputPath: string = `output/${ Math.floor(Math.random() * (10000 - 0) + 0)}_styled_sample_with_qr.pdf`;

generateStyledPDFWithQRCode(content, qrData, outputPath, (err: Error | null) => {
  if (err) {
    console.error('Error generating PDF with QR code and styling:', err);
  } else {
    console.log('Styled PDF with QR code generated successfully at:', outputPath);
  }
}); 
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
