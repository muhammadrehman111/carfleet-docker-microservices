# 🚗 CarFleet — Car Performance Analyzer

CarFleet is a **containerized full-stack web application** that helps users manage and analyze car performance reports.  
It uses a **React + Bootstrap** frontend, **Express.js** backend, **PostgreSQL** for data storage, and **Redis** for job queuing — all orchestrated with **Docker Compose**.

---

## 🧠 Overview

CarFleet allows users to:
- Add cars with details like brand, model, year, and price  
- Generate and queue performance reports for each car  
- View processed reports once completed by a background worker  

This project is ideal for:
- Car enthusiasts and automotive engineers  
- Students or developers studying web systems and microservices  

---

## 🧱 Architecture

Each component runs in a separate Docker container:

| Service | Description | Port |
|----------|--------------|------|
| **frontend** | React + Bootstrap interface | `3000` |
| **backend** | Express.js REST API | `5000` |
| **postgres** | PostgreSQL database | `5432` |
| **redis** | In-memory queue system | `6379` |
| **worker** | Background processor for queued reports | _internal only_ |

**Flow:**
1. The user submits a report from the frontend.  
2. The backend queues it in Redis.  
3. The worker processes queued reports and stores them in PostgreSQL.  
4. The frontend displays completed reports.

---

## ⚙️ Features

- Add and view car information  
- Submit and view performance reports  
- Queue-based background processing (via Redis)  
- Persistent PostgreSQL storage  
- Fully containerized with Docker Compose  
- Responsive UI using Bootstrap  

---

## 🧩 Tech Stack

**Frontend:**
- React.js  
- Bootstrap 5  

**Backend:**
- Node.js / Express.js  
- PostgreSQL (via `pg` library)  
- Redis (for job queue management)  

**DevOps / Tools:**
- Docker & Docker Compose  
- Git & GitHub (for version control)

---

## 📁 Folder Structure

```

carfleet/
├── backend/
│   ├── src/
│   │   ├── config/         # DB & Redis configuration
│   │   ├── controllers/    # Logic for cars & reports
│   │   ├── routes/         # Express routes
│   │   ├── models/         # PostgreSQL models
│   │   ├── middlewares/    # Error handling, etc.
│   │   ├── utils/          # Helper functions
│   │   └── tests/          # API tests
│   ├── scripts/            # DB scripts (init, backup)
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API requests
│   │   ├── components/     # Navbar, forms, etc.
│   │   ├── pages/          # Home, Reports, ReportForm
│   │   └── styles/         # CSS/Bootstrap overrides
│   ├── Dockerfile
│   └── package.json
│
├── worker/                 # Background processor for queued jobs
├── infra/                  # Optional configs (nginx, init.sql)
├── docker-compose.yml
└── README.md

````

---

## ⚡ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/carfleet.git
cd carfleet
````

### 2️⃣ Environment Variables

Create the following `.env` files:

#### 🔹 `backend/.env`

```
PORT=5000
DATABASE_URL=postgres://postgres:postgres@postgres:5432/carfleet
REDIS_URL=redis://redis:6379
```

#### 🔹 `frontend/.env`

```
REACT_APP_API_URL=http://backend:5000/api
```

#### 🔹 `worker/.env`

```
REDIS_URL=redis://redis:6379
DATABASE_URL=postgres://postgres:postgres@postgres:5432/carfleet
```

---

### 3️⃣ Run the Application

```bash
docker compose up --build
```

Then open:

* 🌐 Frontend: [http://localhost:3000](http://localhost:3000)
* ⚙️ Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🐳 Docker Commands

| Purpose                    | Command                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| Build & run all containers | `docker compose up --build`                                      |
| Run normally (faster)      | `docker compose up`                                              |
| Run in background          | `docker compose up -d`                                           |
| Stop all containers        | `docker compose down`                                            |
| View backend logs          | `docker compose logs -f backend`                                 |
| Access PostgreSQL shell    | `docker exec -it carfleet-postgres psql -U postgres -d carfleet` |

---

## 🔗 API Endpoints

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| GET    | `/api/cars`           | Get all cars                             |
| POST   | `/api/cars`           | Add a new car                            |
| GET    | `/api/reports/:carId` | Get all reports for a specific car       |
| POST   | `/api/reports`        | Create a new performance report (queued) |

**Example Request:**

```json
POST /api/reports
{
  "car_id": 1,
  "payload": {
    "title": "Engine Test",
    "details": "Smooth acceleration and efficient fuel economy.",
    "metrics": {
      "0-60 mph": "8.5s",
      "Top Speed": "120 mph"
    }
  }
}
```

---

## 🧩 Troubleshooting

| Problem                    | Possible Fix                                    |
| -------------------------- | ----------------------------------------------- |
| Frontend not loading       | Run `docker compose build frontend`             |
| Database connection failed | Ensure `postgres` container is running          |
| Reports not appearing      | Make sure `worker` service is active            |
| Redis connection refused   | Check `redis` logs: `docker compose logs redis` |

---

## 🚀 Future Enhancements

* Add user authentication (JWT)
* Add report charts and graphs
* Export reports to PDF/CSV
* Deploy to Render or AWS

---

## 👨‍💻 Author

**Developed by:** Muhammad rehman
**Stack:** React, Express, PostgreSQL, Redis, Docker
**Year:** 2025

