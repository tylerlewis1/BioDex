import express from 'express';
import env from "dotenv";

//endpoints
import healthEndpoint from './endpoint/health.js';

const app = express();
env.config({ path: '../.env' });
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

//match path to endpoint
app.use('/health', healthEndpoint);

app.listen(PORT, () => {
  console.log(`BiodexAPI server running on port ${PORT}`);
});