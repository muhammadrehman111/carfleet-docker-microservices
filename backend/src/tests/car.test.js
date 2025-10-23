import request from "supertest";
import app from "../app.js";
import pool from "../config/db.js";

beforeAll(async () => {
  await pool.query("TRUNCATE cars RESTART IDENTITY;");
});

afterAll(async () => {
  await pool.end();
});

describe("Cars API", () => {
  it("POST /api/cars creates a car", async () => {
    const res = await request(app).post("/api/cars").send({
      brand: "Toyota",
      model: "Corolla",
      year: 2021,
      price: 25000
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("GET /api/cars lists cars", async () => {
    const res = await request(app).get("/api/cars");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
