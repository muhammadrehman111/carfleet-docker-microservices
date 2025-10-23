import * as Car from "../models/carModel.js";

export async function listCars(req, res, next) {
  try {
    const cars = await Car.getAllCars();
    res.json(cars);
  } catch (err) {
    next(err);
  }
}

export async function getCar(req, res, next) {
  try {
    const car = await Car.getCarById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    next(err);
  }
}

export async function createCarHandler(req, res, next) {
  try {
    const newCar = await Car.createCar(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
}

export async function updateCarHandler(req, res, next) {
  try {
    const updated = await Car.updateCar(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Car not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteCarHandler(req, res, next) {
  try {
    await Car.deleteCar(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    next(err);
  }
}
