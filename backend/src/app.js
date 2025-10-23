import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/cars", carRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

export default app;
