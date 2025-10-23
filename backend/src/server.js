import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";
import { createTablesIfNotExists } from "./models/carModel.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connection verified");

    await createTablesIfNotExists();

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
