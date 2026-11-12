# BioDex backend API DOCS


## Technical Stack
* **Runtime Environment:** Node.js (v20)
* **Web Framework:** Express.js (ES Modules)
* **Database Image:** PostgreSQL
* **Security & Hashing:** bcrypt
* **Session Management:** JWT

---

## Local Environment Setup

### .ENV
```ini
DB_USER=dbuser
DB_PASSWORD=password
DB_PORT=5432
API_PORT=3000
JWT_SECRET=supersecretkey1234
```

---

### Launch the Application Container
```bash
docker compose up -d --build
```
### Launch API
```bash
npm start
```
## OR
```bash
node index.js
```

---

## API Endpoint Reference

### 1. Health Diagnostics
Checks the live operational state of the server and its connection to the database layer.

* **Endpoint:** `GET /health`
* **Authentication:** None required
* **Success Response (`200 OK`):**

---

### 2. Account Registration (Signup)
Hashes user passwords securely using `bcrypt` and initializes a new row profile in the database.

* **Endpoint:** `POST /auth/signup`
* **Authentication:** None required
* **Payload Request Body:**

```json
{
  "username": "biodex_trainer",
  "email": "trainer@biodex.com",
  "password": "supersecurepassword1"
}
```
* **Success Response (`200`):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "biodex_trainer",
    "email": "trainer@biodex.com",
    "createdAt": "2026-11-08T00:00:00.000Z"
  }
}
```

---

### Login 
Validates plain-text credentials against stored database hashes and sends back a JWT.

* **Endpoint:** `POST /auth/login`
* **Authentication:** None required
* **Payload Request Body:**
```json
{
  "username": "biodex_trainer",
  "password": "supersecurepassword1"
}
```
* **Success Response (`200 OK`):**
```json
{
  "success": true,
  "JWT": "1293102931jknl12n3j2n3...",
  "user": {
    "id": 1,
    "username": "biodex_trainer",
    "email": "trainer@biodex.com"
  }
}
```

---
### Search by Species Name
Searches for species by name sends back species sorted alphabetically by common name.

* **Endpoint:** `POST /species/search/name`
* **Authentication:** Required
* **Payload Request Body:**
```json
{
  "search_value": "boxfish",
}
```
* **Success Response (`200 OK`):**
```json
[
    {
        "species_id": 4807211,
        "common_name": "Black-banded Pygmy Boxfish",
        "scientific_name": "Capropygia unistriata",
        "info": "{species of fish}",
        "biome": "Marine"
    }
]
```

---
### Search Species by ID
Searches for species by ID.

* **Endpoint:** `POST /species/search/id`
* **Authentication:** Required
* **Payload Request Body:**
```json
{
  "search_value": 4807211,
}
```
* **Success Response (`200 OK`):**
```json

    {
      "species_id": 4807211,
      "common_name": "Black-banded Pygmy Boxfish",
      "scientific_name": "Capropygia unistriata",
      "info": "{species of fish}",
      "biome": "Marine"
  }
```
---
### Get Species
Gets species alphabetically by common name. Max limit 100

* **Endpoint:** `POST /species/get`
* **Authentication:** Required
* **Payload Request Body:**
```json
{
  "limit": 2,
  "offset": 20
}
```
* **Success Response (`200 OK`):**
```json
[
    {
        "species_id": 4882899,
        "common_name": "19-spot Ladybird",
        "scientific_name": "Anisosticta novemdecimpunctata",
        "info": "{Anisosticta novemdecimpunctata, known as the water ladybird, is a species of beetle in family Coccinellidae. It is found in the Palearctic.}",
        "biome": "Temperate Broadleaf & Mixed Forests"
    },
    {
        "species_id": 4967278,
        "common_name": "20-spotted Ladybird Beetle",
        "scientific_name": "Psyllobora vigintimaculata",
        "info": "{Psyllobora vigintimaculata, the twenty-spotted lady beetle, is a species of lady beetle in the family Coccinellidae. It is found in North America, where it has been recorded from Newfoundland to Alaska in the north and from Virginia to Tennessee and Louisiana, west to southern California.}",
        "biome": "Temperate Broadleaf & Mixed Forests"
    }
]
```

---
### Get Species by Biome
Gets species sorted by biome

* **Endpoint:** `POST /species/get`
* **Authentication:** Required
* **Payload Request Body:**
```json
{
  "limit": 2,
  "offset": 20,
  "biome_id": 17
}
```
* **Success Response (`200 OK`):**
```json
[
   
    {
        "species_id": 3567708,
        "common_name": "Acoupa weakfish",
        "scientific_name": "Cynoscion acoupa",
        "info": "{Cynoscion acoupa, the acoupa weakfish, blacktail basher or grey snapper, is a species of marine ray-finned fish belonging to the family Sciaenidae, the drums and croakers. This fish is found in the western Atlantic.}",
        "biome": "Freshwater"
    },
    {
        "species_id": 4443593,
        "common_name": "Acre corydoras",
        "scientific_name": "Corydoras acrensis",
        "info": "{species of fish}",
        "biome": "Freshwater"
    }

]
```

---
### Get User Stats
Gets species sorted by biome

* **Endpoint:** `GET /user/stats/:id`
* **Authentication:** Required
* **Success Response (`200 OK`):**
```json
{
    "total_sightings": "2",
    "species_sighted": "1",
    "total_species": "1658193"
}
```

---
