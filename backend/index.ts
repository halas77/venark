import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoutes from "./routes/example.r";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/example", exampleRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ Server is running on http://localhost:${PORT}`);
});
