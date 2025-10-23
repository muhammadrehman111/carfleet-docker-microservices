import * as Report from "../models/reportModel.js";
import redis from "../config/redis.js";

export async function createReportHandler(req, res, next) {
  try {
    const { car_id, payload } = req.body;

    const job = {
      type: "generate_report",
      car_id,
      payload,
      ts: Date.now()
    };

    await redis.lpush("jobs", JSON.stringify(job));

    res.status(202).json({ status: "queued", job });
  } catch (err) {
    next(err);
  }
}

export async function getReports(req, res, next) {
  try {
    const reports = await Report.getReportsForCar(req.params.car_id);
    res.json(reports);
  } catch (err) {
    next(err);
  }
}
