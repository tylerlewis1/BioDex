import { Pool } from 'pg';
import env from "dotenv";

env.config({ path: '../../.env' });
const pool = new Pool({
  host: "db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,   
  port: process.env.DB_PORT     
});

const checkStatus = async() => {
    try {
      await pool.query('SELECT 1');
      return true;
    } catch(error){
        console.error(error);
        return false;
    }
}

export const db = {
  query: (text, params) => pool.query(text, params),
  checkStatus: checkStatus()
};