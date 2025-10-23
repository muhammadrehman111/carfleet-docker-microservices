import express from "express";
import { createReportHandler, getReports } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", createReportHandler);
router.get("/:car_id", getReports);

export default router;
