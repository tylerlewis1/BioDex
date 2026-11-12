import express from 'express';
import env from "dotenv";

//endpoints
import healthEndpoint from './endpoint/health.js';
import authEndpoint from './endpoint/auth.js';
//species endpoints
import searchEndpoint from './endpoint/species_endpoint/search.js';
import getSpeciesEndpoint from './endpoint/species_endpoint/get.js';
//user endpoints
import getStatsEndpoint from './endpoint/user_endpoint/stats.js';
const app = express();
env.config({ path: '../.env' });
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

//match path to endpoint
app.use('/health', healthEndpoint);
app.use('/auth', authEndpoint);
//species endpoints
app.use('/species/search', searchEndpoint);
app.use('/species/get', getSpeciesEndpoint);
//user endpoints
app.use('/user/stats', getStatsEndpoint);
app.listen(PORT, () => {
  console.log(`BiodexAPI server running on port ${PORT}`);
});