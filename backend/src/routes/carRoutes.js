import express from "express";
import {
  listCars,
  getCar,
  createCarHandler,
  updateCarHandler,
  deleteCarHandler
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", listCars);
router.get("/:id", getCar);
router.post("/", createCarHandler);
router.put("/:id", updateCarHandler);
router.delete("/:id", deleteCarHandler);

export default router;
