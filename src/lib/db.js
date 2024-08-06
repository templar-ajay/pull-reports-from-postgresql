// db.js
import { Pool } from "pg";

const user = process.env.POSTGRESQL_USER;
const host = process.env.POSTGRESQL_HOST;
const database = process.env.POSTGRESQL_DATABASE;
const password = process.env.POSTGRESQL_PASSWORD;
const port = process.env.POSTGRESQL_PORT;

// Database connection parameters
const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

export default pool;
