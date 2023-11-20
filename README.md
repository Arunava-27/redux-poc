
# REDUX PROOF OF CONCEPT

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application created using Vite.

## Project Structure

The project is organized into two main folders:

- `backend`: Node.js server using Express.js
- `frontend`: React.js application using Vite

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Arunava-27062003/redux-poc.git
   cd redux-poc
2. **Install dependencies for the backend:**
	```bash
	cd backend 
	npm install
3. **Install dependencies for the frontend:**
	```bash
	cd frontend 
	npm install
4. **Set up the backend environment variables:**
Create a `.env` file in the root of the `backend` folder and add the following:
	```bash
	NODE_ENV=production 
	PORT=8080 
	DB_URL=mongodb+srv://<username>:<password>@<your-mongodb-uri>/redux?retryWrites=true&w=majority 
	JWT_SECRET=<your-jwt-secret>
5. **Start the backend server:**
	```bash
	cd backend 
	nodemon