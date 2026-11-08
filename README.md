**Project Title:** BioDex 
**Author:** Tyler Lewis 
**Course:** CS 364 
**Date Submitted:** 10/25/2026 

# **1. Problem Statement** 

Nature enthusiasts often like to track what species they find/see on their expeditions. There are several apps that allow them to do this, but they often find themselves switching apps to track different types of organisms. This can be a cumbersome workflow and lead to users not wanting to log sightings. BioDex is a reallife Pokédex. It will centralize the collection of all this data by providing one database to log all of their sightings. Users will be able to track every sighting of an animal they see in the wild. BioDex will collect data about sightings such as location, time, photos and more. This data can be used by scientists as data for a multitude of applications. 

# **Stake Holders and Users** 

- **Explorers (registered users)** individuals who log sightings, attach notes and photos, and review their personal records. 

- **Scientists** individuals who browse the data and compare sightings data. 

# **2. Database Design** 

The database is a relational design consisting of six tables: four primary entity types (User, Species, Biome, Sighting) and two supporting tables (Field_Note, Photo). The design contains two many-to-many relationships and several one-to-one and many-to-many relationships. 

- User 

   - Contains information about the app user. 

- Species 

   - This will be a dataset of all the known species, It will hold information like their names, facts etc… 

- Sighting 

   - This will hold information about the sightings like the time, location and other info. 

- Biome 

   - This will be used to classify what biome the species belongs in. 

- Photo 

   - This will hold all the photo data like what it is a photo of and where It can be found. 

- Field Note 

**Project Title:** BioDex **Author:** Tyler Lewis **Course:** CS 364 **Date Submitted:** 10/25/2026 

`o` This will store users’ notes that they wrote about the sighting if they so chose to. 

ER Diagram 



<!-- Start of picture text -->
<img src="https://i.ibb.co/fVC2KjbS/ER-diagram.png" alt="er diagram"/>

# **3. Functionality** 

BioDex is a CRUD app. The following is how each operation will be used. 

- **Create** 

   - Users will be able to create sightings 

   - Users will be able to create user accounts 

- **Read** 

   - The app will need to be able to read past sightings 

   - The app will need to read and display data from the species table 

   - The app will need to be able to read and display photo data. 

   - The app will need to read and display the field note. 

   - The app will need to be able to read user information. 

   - The app will need to be able to read and display the biome information. 

- **Update** 

   - Users will be able to update their field notes after the fact. 

   - Users will be able to update their name after it is set. 

- **Delete** 

   - Users will be able to delete sightings 

**Project Title:** BioDex **Author:** Tyler Lewis **Course:** CS 364 **Date Submitted:** 10/25/2026 

   - The app will have to be able to delete things associated with the sighting after its deletion. 

   - Users will be able to delete their account 

- **Advanced Queries** 

   - 10 Most Recent Sightings (Group 1 & 2) 

      - The app will list the 10 most recent sightings. This uses ORDER BY and LIMIT (Group 1) and requires joining 5 tables: User, Sighting, Species, Photo, and Biome to display the full data (Group 2). 

   - Active Explorers (Group 2) 

      - The app will list the "Top Explorers" who have logged more than 10 sightings. This uses COUNT(), GROUP BY, and a HAVING clause to filter for only highly active users. 

   - Unseen Species (Group 3) 

      - The app will list native species the user has never logged before. This uses a NOT IN subquery to compare the Species table against the user's Sighting history. 

# **4. Technical Requirements** 

This app will use a modern tech stack built for portability and sustainability. 

- Frontend 

   - React native (potentially swift but probably not) 

- Backend 

   - Node.js 

   - Express.js 

- Database 

   - Docker with Postgres 

- Version control 

   - GitHub 

