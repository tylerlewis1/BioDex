import { Pool } from 'pg';
import express from 'express';
import env from "dotenv";

env.config({ path: '../.env' });

//database config
const pool = new Pool({
  host: "db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,   
  port: process.env.DB_PORT     
});

