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
import authCheckEndpoint from './endpoint/user_endpoint/check_auth.js';
//biome endpoints
import getBiomeEndpoints from "./endpoint/biome_endpoint/get.js";
//animal type endpoints
import getAnimalTypeEndpoints from "./endpoint/animal_type_endpoint/get.js";
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
app.use('/user/check-auth', authCheckEndpoint);
//biome endpoints
app.use('/biome', getBiomeEndpoints);
//animal type endpoints
app.use('/animal-type', getAnimalTypeEndpoints);
app.listen(PORT, () => {
  console.log(`BiodexAPI server running on port ${PORT}`);
});