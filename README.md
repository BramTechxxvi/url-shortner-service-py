# BramShort

BramShort is a full-stack URL shortener built with FastAPI, PostgreSQL, React, and TypeScript.

It allows users to shorten long URLs, optionally set an expiration period, and use the generated short link to redirect to the original destination.

The project was developed using a test-driven approach and uses separate database environments for development, testing, and production.

## Live Application

Frontend:

https://bramshort.netlify.app

Backend API:

https://url-shortner-service-cu9w.onrender.com

API documentation:

https://url-shortner-service-cu9w.onrender.com/docs

## Features

- Create short URLs from long links
- Redirect short URLs to their original destination
- Optional link expiration
- Expiration by hours or days
- URL validation
- Collision-safe short code generation
- Click count tracking
- Separate development and test databases
- Responsive frontend
- REST API documentation
- Unit and integration tests

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Psycopg
- Alembic
- Pydantic
- Pytest

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

### Infrastructure

- Docker
- Supabase PostgreSQL
- Render
- Netlify
- GitHub

## Project Structure

```text
url-shortner-service-py/
├── backend/
│   ├── alembic/
│   ├── app/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── tests/
│   │   ├── integration/
│   │   └── unit/
│   ├── alembic.ini
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Architecture

The backend follows a layered structure:

```text
Route
  ↓
Service
  ↓
Repository
  ↓
SQLAlchemy
  ↓
PostgreSQL
```

Routes handle HTTP requests and responses.

Services contain the application logic.

Repositories handle database operations.

This keeps business logic separate from the API and database layers.

## How URL Shortening Works

When a URL is submitted:

1. The API validates the URL.
2. A short code is generated.
3. The service checks whether the code already exists.
4. A new code is generated if a collision occurs.
5. The original URL and short code are stored in PostgreSQL.
6. The API returns the generated short URL.

When a short URL is opened, the backend resolves the short code and redirects the user to the original destination.

## API Endpoints

### Create a Short URL

```http
POST /api/v1/urls
```

Example request:

```json
{
  "url": "https://example.com/some/long/url",
  "expires_at": null
}
```

Example response:

```json
{
  "original_url": "https://example.com/some/long/url",
  "short_code": "aB3xK9",
  "short_url": "https://url-shortner-service-cu9w.onrender.com/aB3xK9",
  "created_at": "2026-10-06T12:00:00Z",
  "expires_at": null
}
```

### Redirect to Original URL

```http
GET /{short_code}
```

If the short code exists and has not expired, the API redirects the user to the original URL.

If the link has expired, the API returns:

```http
410 Gone
```

If the short code does not exist, the API returns:

```http
404 Not Found
```

### Database Health Check

```http
GET /health/db
```

Used to verify that the application can connect to PostgreSQL.

## Link Expiration

Links can be created without an expiration time or with a custom duration.

The frontend supports:

- Never expires
- Hours
- Days

The selected duration is converted to an ISO timestamp before it is sent to the API.

The backend validates the expiration value and ensures it is in the future.

## Local Development

### Clone the Repository

```bash
git clone git@github.com:BramTechxxvi/url-shortner-service-py.git
cd url-shortner-service-py
```

## Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory.

```env
APP_NAME=URL Shortener API
APP_ENV=development

DATABASE_URL=postgresql+psycopg://<username>:<password>@localhost:5432/url_shortener_db
TEST_DATABASE_URL=postgresql+psycopg://<username>:<password>@localhost:5432/url_shortener_test_db

BASE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

Replace the placeholders with your local PostgreSQL credentials.

Do not commit the `.env` file.

## Database Setup

The local PostgreSQL database runs through Docker.

From the project root:

```bash
docker compose up -d db
```

Create the test database if it does not already exist:

```bash
docker compose exec db psql -U <username> -d postgres -c "CREATE DATABASE url_shortener_test_db;"
```

Replace `<username>` with the PostgreSQL user configured in your Docker environment.

Apply the database migrations:

```bash
cd backend
alembic upgrade head
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

## Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Testing

The backend was developed using the following workflow:

```text
RED → GREEN → REFACTOR
```

The test suite includes unit and integration tests covering:

- Short code generation
- URL creation
- Short code collisions
- URL resolution
- Click count updates
- Missing short URLs
- Expired links
- Expiration validation
- Repository operations
- API routes

Run the tests from the backend directory:

```bash
pytest
```

Run the test suite with coverage:

```bash
pytest --cov=app
```

Tests use a separate PostgreSQL database so test data does not affect the development database.

## Database Environments

The project uses separate databases for each environment.

```text
Development
Docker PostgreSQL
        ↓
url_shortener_db


Testing
Docker PostgreSQL
        ↓
url_shortener_test_db


Production
Supabase PostgreSQL
```

This keeps development, automated testing, and production data isolated from one another.

## Database Migrations

Alembic is used to manage database schema changes.

Create a migration:

```bash
alembic revision --autogenerate -m "migration description"
```

Apply migrations:

```bash
alembic upgrade head
```

## Environment Variables

### Backend

```env
APP_NAME=URL Shortener API
APP_ENV=development

DATABASE_URL=<database-connection-string>
TEST_DATABASE_URL=<test-database-connection-string>

BASE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:8000
```

Environment files containing real credentials should not be committed to Git.

A `.env.example` file can be used to document the required variables without exposing credentials.

## Deployment

### Backend

The FastAPI backend is deployed on Render.

Production configuration uses environment variables such as:

```env
APP_ENV=production
DATABASE_URL=<production-database-url>
BASE_URL=https://url-shortner-service-cu9w.onrender.com
FRONTEND_URL=https://bramshort.netlify.app
```

The production database connection string is stored securely in Render and is not committed to the repository.

### Frontend

The React frontend is deployed on Netlify.

The production frontend uses:

```env
VITE_API_BASE_URL=https://url-shortner-service-cu9w.onrender.com
```

`VITE_API_BASE_URL` is a public client-side configuration value and does not contain credentials.

## Production Architecture

```text
Browser
   ↓
Netlify
React + TypeScript
   ↓
Render
FastAPI
   ↓
Supabase
PostgreSQL
```

## Security and Configuration

Sensitive values are managed through environment variables.

The repository should never contain:

- Production database passwords
- Supabase database passwords
- Full production database connection strings
- API keys
- Access tokens
- Private keys
- `.env` files containing real credentials

Public application URLs such as the Netlify frontend and Render API URLs are safe to include in the repository.

## Development Decisions

Some of the main implementation decisions include:

- Business logic is kept outside route handlers.
- Database operations are handled through repository classes.
- Development and test databases are separated.
- Production configuration is provided through environment variables.
- Short codes are checked for collisions before being stored.
- Link expiration is enforced by the backend.
- Database schema changes are managed through Alembic migrations.
- The backend and frontend are kept in the same repository.

## Future Improvements

Possible improvements include:

- Custom short aliases
- QR code generation
- Link analytics
- Rate limiting
- User accounts
- Link management dashboard
- Custom domains
- More detailed click statistics

## Author

Built by Ibrahim Ibrahim.