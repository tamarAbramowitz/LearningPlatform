# Learning Platform
An AI-driven learning platform (Mini MVP) built with Node.js/TypeScript backend and Angular frontend. Allows users to generate personalized lessons by category and sub-category using AI integration.

## Project Structure
- `backend/` - Node.js/TypeScript REST API server
- `frontend/` - Angular web application
- `docker-compose.yml` - Database setup

## Technologies Used
### Backend
- Node.js with TypeScript
- Express.js for REST API
- MongoDB with Mongoose
- OpenAI GPT-3.5-turbo for AI integration
- JWT for authentication
- Docker for database

### Frontend
- Angular with TypeScript
- Angular Material for UI components

## Prerequisites
- Node.js 18+
- Docker and Docker Compose
- OpenAI API key

## Local Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Start the database: `docker-compose up -d`
4. Install backend dependencies: `cd backend && npm install`
5. Start backend: `npm run dev`
6. Install frontend dependencies: `cd frontend && npm install`
7. Start frontend: `npm start`

## Running the Application
- Backend: http://localhost:3000
- Frontend: http://localhost:4200

## Features
- User registration and login
- Category and sub-category selection
- AI-powered lesson generation
- Learning history tracking
- Admin dashboard for user management

## API Documentation
See backend README for detailed API endpoints.

## Deployment
The application can be deployed to platforms like Vercel (frontend) and Heroku (backend).

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard: OPENAI_API_KEY, JWT_SECRET, MONGO_URI
3. Push backend code to Heroku git
4. Ensure MongoDB is accessible (use MongoDB Atlas for production)

### Frontend Deployment (Vercel)
1. Connect GitHub repo to Vercel
2. Set build command: `ng build`
3. Set API base URL to deployed backend URL

Demo links: [Frontend](https://your-vercel-url.vercel.app) | [Backend API Docs](https://your-heroku-url/api-docs)
