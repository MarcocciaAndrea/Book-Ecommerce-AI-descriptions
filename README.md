# Bookstore Management System

A full-stack application for managing a bookstore's inventory with automatic book description generation using AI.

## Features

- Create, Read, Update, and Delete books
- Automatic book description generation using OpenAI
- Filter and sort books
- Responsive design

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- AI Service: Python with FastAPI and OpenAI

## Prerequisites

- Node.js
- Python 3.8+
- MongoDB
- OpenAI API key

## Installation

1. **Clone the repository** 
bash
git clone <your-repo-url>
cd bookstore-management


2. **Backend setup**
bash
cd backend
npm install

3. **Frontend setup**
bash
cd frontend
npm install

4. **Python service setup**
bash
cd python-service
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt


5. **Environment variables**
Create `.env` file in python-service directory:
OPENAI_API_KEY=your_openai_api_key_here


## Running the Application

1. **Start MongoDB**

2. **Start the backend**
bash
cd backend
node server.js

3. **Start the frontend**
bash
cd frontend
npm start

4. **Start the Python service**
bash
cd python-service
python book_description_service.py

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Python service: http://localhost:5001

## API Documentation

### Backend Endpoints
- GET `/api/books` - Get all books
- GET `/api/books/:id` - Get a specific book
- POST `/api/books` - Create a new book
- PUT `/api/books/:id` - Update a book
- DELETE `/api/books/:id` - Delete a book

### Python Service Endpoints
- POST `/generate-description` - Generate book description
