require("dotenv").config();
import cors from "cors";
import express from "express";
import exampleRoutes from "./routes/example.r";
import creativeRoutes from "./routes/creative.r";
import analyzerRoutes from "./routes/analyze.r";
import agreementRoute from "./routes/agreement.r";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/example", exampleRoutes);
app.use("/api/generate-content", creativeRoutes);
app.use("/api/analyze-content", analyzerRoutes);
app.use("/api/create-agreement", agreementRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ Server is running on http://localhost:${PORT}`);
});
