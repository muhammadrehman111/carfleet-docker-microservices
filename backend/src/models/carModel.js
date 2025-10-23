import pool from "../config/db.js";

export async function createTablesIfNotExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      brand VARCHAR(100),
      model VARCHAR(100),
      year INT,
      price NUMERIC,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      car_id INT REFERENCES cars(id) ON DELETE CASCADE,
      data JSONB,
      created_at TIMESTAMP DEFAULT now()
    );
  `);
}

export async function getAllCars() {
  const { rows } = await pool.query("SELECT * FROM cars ORDER BY id ASC");
  return rows;
}

export async function getCarById(id) {
  const { rows } = await pool.query("SELECT * FROM cars WHERE id=$1", [id]);
  return rows[0];
}

export async function createCar({ brand, model, year, price }) {
  const { rows } = await pool.query(
    `INSERT INTO cars (brand, model, year, price) VALUES ($1,$2,$3,$4) RETURNING *`,
    [brand, model, year, price]
  );
  return rows[0];
}

export async function updateCar(id, { brand, model, year, price }) {
  const { rows } = await pool.query(
    `UPDATE cars SET brand=$1, model=$2, year=$3, price=$4 WHERE id=$5 RETURNING *`,
    [brand, model, year, price, id]
  );
  return rows[0];
}

export async function deleteCar(id) {
  await pool.query("DELETE FROM cars WHERE id=$1", [id]);
}
