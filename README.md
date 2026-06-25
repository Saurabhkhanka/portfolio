# Saurabh Singh Khanka - Professional Portfolio

This repository contains my personal portfolio website, featuring a React & Vite single-page application frontend, an Express API backend, and a MongoDB database. The entire application is containerized with Docker and orchestrated using Docker Compose.

## Project Structure
- **/client**: React (Vite) frontend application.
- **/backend**: Node.js & Express API server.
- **/docker-compose.yml**: Configuration file to link the frontend, backend, and MongoDB database.

## Technology Stack

- **Frontend:** React, Next.js, React Native, Redux Toolkit, RTK Query, HTML5, CSS3, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT, Bcrypt, Role-Based Access Control (RBAC), Nodemailer
- **Database:** MongoDB (Mongoose), MySQL
- **DevOps & Tools:** Docker, Docker Compose, Nginx, Git, GitHub, Render, Postman, NPM

## Getting Started (Docker setup)

To run the entire stack locally using Docker:

### Prerequisites
Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Launching the Application
1. Clone the repository and navigate to the root directory:
   ```bash
   cd portfolio
   ```
2. Build and start the containers in detached mode:
   ```bash
   docker compose up --build -d
   ```
3. Open your browser and navigate to:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3600`
   - MongoDB: `mongodb://localhost:27017`

### Shutting Down
To stop all services and keep database volumes intact:
```bash
docker compose down
```
