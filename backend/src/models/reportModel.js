import pool from "../config/db.js";

export async function createReport(car_id, data) {
  const { rows } = await pool.query(
    `INSERT INTO reports (car_id, data) VALUES ($1, $2) RETURNING *`,
    [car_id, data]
  );
  return rows[0];
}

export async function getReportsForCar(car_id) {
  const { rows } = await pool.query(
    `SELECT * FROM reports WHERE car_id = $1 ORDER BY created_at DESC`,
    [car_id]
  );
  return rows;
}
