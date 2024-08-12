import { createPool } from 'mysql2/promise'; // Promise-based MySQL
import dotenv from 'dotenv'
dotenv.config();
const pool = createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
});

export default pool;
