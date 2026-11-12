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
