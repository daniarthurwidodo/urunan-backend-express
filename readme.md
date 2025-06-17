# Urunan Backend Express

## Description

A backend application built with Express.js for managing urunan (group expense sharing).

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (if using MongoDB as database)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd urunan-backend-express

Install dependencies:
Set up environment variables:
Edit the .env file with your configuration settings.

How to Run
Development Mode
Production Mode
Using Docker (if applicable)
API Endpoints
The server will run on http://localhost:3000 (or the port specified in your environment variables).

Testing
Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request


## Usage Commands how to run app
### Option 1: Run only PostgreSQL in Docker (recommended for development)
'''text
bash# Start PostgreSQL and pgAdmin
npm run docker:dev

# Or run in background
docker-compose up -d postgres pgadmin

# Then run your Express app locally
npm run dev
'''

### Option 2: Run everything in Docker
bash# Build and start all services
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
Individual Docker commands
bash# Start only PostgreSQL
docker-compose up -d postgres

# Start PostgreSQL and pgAdmin
docker-compose up -d postgres pgadmin

# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v

# View logs
docker-compose logs postgres
docker-compose logs app