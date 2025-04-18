# restaurant_api

## Backend API for Nearby Restaurants App
This is the backend service for the Nearby Restaurants App , providing RESTful APIs to fetch restaurant and food data, filter restaurants by cuisine, and find nearby restaurants based on geolocation.

## Table of Contents

## Setup Instructions
API Endpoints
Architectural Decisions
Future Improvements
Setup Instructions

# Prerequisites
Node.js (v16 or higher)
npm or yarn
PostgreSQL (for the database)
Docker (for containerized deployment)

# Installation Steps

## git clone https://github.com/your-repo/nearby-restaurants-backend.git
## cd restaurant_api
## npm install

# Configure Environment Variables
## Create a .env file in the root directory with the following variables:

DATABASE_URL=postgres://username:password@localhost:5432/your-database-name
JWT_SECRET=your-secret-key
PORT=5000

# Start Server

## Run With Docker
docker-compose up --build


# Architectural Decisions
## 1. Technology Stack
### Node.js with Express :
Chosen for its simplicity, scalability, and ease of integration with modern tools.
### PostgreSQL :
Used for its robustness, support for geospatial queries, and ACID compliance.
RESTful API Design :
Follows REST principles for predictable and scalable endpoints.
## 2. Database Schema
### users Table :
Stores user information for authentication.
### restaurants Table :
Contains restaurant details, including location (lat, lng) for geospatial queries.
### foods Table :
Stores food items associated with restaurants via a foreign key (restaurant_id).
## 3. Geospatial Queries
Implemented the Haversine formula to calculate distances between user location and restaurants.
Considered PostGIS for more advanced geospatial queries in the future.
## 4. Security
Passwords are hashed using bcrypt before storing in the database.
JWT-based authentication ensures secure API access.

# Future Improvements
## Core Features

## Pagination :
Implement pagination for restaurant and food lists to improve performance with large datasets.

## Advanced Search Filters :
Add filters for price range, rating, and distance.

## Caching :
Use Redis or another caching solution to reduce database load for frequently accessed data.

# Security
## Rate Limiting :
Prevent abuse of the API by implementing rate limiting.
## CORS Restrictions :
Restrict API access to trusted frontend origins only.

## Testing
Unit and Integration Tests :
Add tests for API endpoints using tools like Jest and Supertest.

## CI/CD Pipeline :
Set up a CI/CD pipeline for automated testing and deployment.