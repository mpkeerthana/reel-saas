# Reel SaaS

A full-stack social media planning SaaS app with a React + Vite frontend and an Express/MongoDB backend.

## Project Structure

- `frontend/` — React app using Vite, Tailwind CSS, and client-side routing.
- `backend/` — Node.js Express API with authentication, idea generation, and MongoDB models.
- `backend/.env` — backend environment variables.

## Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # if you have an example file
# then edit .env with your MongoDB, JWT, and API keys
npm start
```

The backend should run on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend should run on `http://localhost:5173` by default.

### 3. Build for Production

```bash
cd frontend
npm run build
```

## Environment Variables

### Backend

Use `backend/.env` for backend secrets. Example values:

```dotenv
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
GROQ_API_KEY=your-groq-api-key
PORT=5000
```

### Frontend

Create Vite env files in `frontend/` if they do not exist:

- `frontend/.env.local`
- `frontend/.env.production`

Example:

```env
VITE_API_BASE_URL=https://reel-saas-backend.onrender.com/api
```

When running locally, `frontend/.env.local` can use:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Deployment Notes

- Make sure the frontend is rebuilt after changing the API base URL.
- Deploy the frontend after committing changes so the live site uses the updated bundle.
- Ensure the backend environment variables are configured on the deployment platform.

## Useful Commands

```bash
# Backend
cd backend
npm start

# Frontend dev
cd frontend
npm run dev

# Build frontend
cd frontend
npm run build
```

## Notes

- The frontend uses `frontend/src/services/api.js` to set the API base URL.
- If the live frontend still points to `localhost`, redeploy after updating the build.
