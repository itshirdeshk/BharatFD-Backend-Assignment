# FAQ Admin Panel

A simple FAQ management system that provides a RESTful API and a React-based admin panel. This project uses Node.js with Express and Mongoose for the backend, and a React app for managing FAQs. The admin panel lets you create, update, delete, and fetch FAQs via a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend (Admin Panel) Setup](#frontend-admin-panel-setup)
- [API Usage Examples](#api-usage-examples)
- [Contribution Guidelines](#contribution-guidelines)
- [Docker Deployment (Optional)](#docker-deployment-optional)
- [Contact](#contact)

## Features

- **CRUD API Endpoints:** Manage FAQs (Create, Read, Update, Delete)
- **React Admin Panel:** A simple and clean user interface for managing FAQs
- **MongoDB Integration:** Uses MongoDB for data storage
- **TypeScript:** Both backend and frontend use TypeScript for improved type safety
- **Docker Support:** (Optional) Run the application in containers using Docker Compose

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (v6 or later)
- [MongoDB](https://www.mongodb.com/) (or use Docker for MongoDB)
- [Git](https://git-scm.com/)
- (Optional) [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/itshirdeshk/BharatFD-Backend-Assignment.git
   cd bharatdf-backend-assignment/backend
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend directory with the following content:

   ```dotenv
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/faqdb
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

5. **Redis Setup Using Docker:**

    **Note:** Our backend application uses Redis for caching. If you don't have Redis installed on your system, you can easily run it using Docker.
   
    **Prerequisites:**  
    - [Docker](https://www.docker.com/get-started) must be installed and running on your machine.
   
    **Steps to Run Redis with Docker:**
    
    1. **Open a Terminal:**  
       Open your terminal or command prompt.
   
    2. **Pull the Redis Docker Image:**  
       Run the following command to pull the latest Redis image from Docker Hub:
       ```bash
       docker pull redis:latest
       ```
   
    3. **Run the Redis Container:**  
       Start a new container from the Redis image and map the container's port 6379 to your host's port 6379:
       ```bash
       docker run --name my-redis -p 6379:6379 -d redis
       ```
       - `--name my-redis` gives your container a friendly name.
       - `-p 6379:6379` maps port 6379 from the container to your local machine.
       - `-d` runs the container in detached mode.
   
    4. **Verify the Container is Running:**  
       Check that your Redis container is up and running with:
       ```bash
       docker ps
       ```
       You should see a container named `my-redis` in the list.
   
    5. **Configure Your Backend:**  
       In your backend application's `.env` file (as shown above), ensure the Redis host and port are set:
       ```dotenv
       REDIS_HOST=localhost
       REDIS_PORT=6379
       ```


4. **Build the backend server:**

   ```bash
   npm run build
   ```

5. **Run the backend server:**

   ```bash
   npm start
   ```

   The backend server should now be running on [http://localhost:8080](http://localhost:8080).

### Frontend (Admin Panel) Setup

1. Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd ../admin-panel
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Run the React development server:**

   ```bash
   npm run dev
   ```

   The admin panel will open in your default browser at [http://localhost:3000](http://localhost:3000).

## API Usage Examples

The backend provides the following REST API endpoints:

### 1. Get All FAQs

- **Endpoint:** `GET http://localhost:8080/api/faq?lang=<code>`
- **Example:**

  ```bash
  curl http://localhost:8080/api/faq?lang=<code>
  ```

### 2. Create a New FAQ

- **Endpoint:** `POST http://localhost:8080/api/faq`
- **Request Body:**

  ```json
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
  }
  ```

- **Example using curl:**

  ```bash
  curl -X POST http://localhost:8080/api/faq \
       -H "Content-Type: application/json" \
       -d '{"question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime built on Chrome\'s V8 engine."}'
  ```

### 3. Update an Existing FAQ

- **Endpoint:** `PUT http://localhost:8080/api/faq`
- **Request Body:**

  ```json
  {
    "id": "faq_id_here",
    "question": "Updated Question?",
    "answer": "Updated Answer"
  }
  ```

### 4. Delete an FAQ

- **Endpoint:** `DELETE http://localhost:8080/api/faq/faq_id_here`
- **Example using curl:**

  ```bash
  curl -X DELETE http://localhost:8080/api/faq/faq_id_here
  ```

## Contribution Guidelines

Contributions are welcome! Please follow these guidelines:

1. **Fork the Repository:**  
   Click the "Fork" button at the top right of the repository page to create your own copy.

2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes:**  
   Make sure your commit messages are clear and descriptive. Follow the conventional commit format if possible (e.g., `feat: add new FAQ endpoint`).

4. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request:**  
   Open a pull request on the original repository and provide a clear description of your changes.

### Code Style

- The project uses **ES6+** and **TypeScript**.
- Ensure that your code is linted and formatted properly.
- Run `npm run lint` (or the corresponding command) to check for style issues before committing.

### Running Tests

- The backend includes unit tests using Jest and Supertest.
- To run the tests, navigate to the backend directory and run:

  ```bash
  npm test
  ```

## Docker Deployment (Optional)

If you prefer to run the entire application using Docker, use the provided `docker-compose.yml` file. Ensure Docker and Docker Compose are installed on your machine, then run:

```bash
docker-compose up --build
```

This command builds and starts containers for the backend, MongoDB and redis.

## Contact

For questions or support, please open an issue in this repository or contact hirdeshkhandelwal58@gmail.com.

---

Enjoy managing your FAQs!
