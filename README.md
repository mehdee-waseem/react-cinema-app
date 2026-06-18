# Marquee - Movie Discovery

A movie browsing site - Now Showing, Coming Soon, Popular, and Top Rated -
with search, genre filters, and a favorites list.

- **frontend/** - React (Vite)
- **backend/** - Node.js + Express

## Features

- Now Showing / Coming Soon / Popular / Top Rated tabs
- Live search across movies
- Genre filter chips
- Favorites - saved per visitor in a local database, no login needed
- Movie detail pages with rating, runtime, genres, and synopsis

## Powered by TMDB

This app's movie data, posters, and backdrop images come from
[**TMDB**](https://www.themoviedb.org/) (The Movie Database) - a free,
community-driven movie API. It is **not** affiliated with or sourced
from IMDb.

> This product uses the TMDB API but is not endorsed or certified by TMDB.

You'll need your own free TMDB API key to run this project:
themoviedb.org → Settings → API → request a key (Developer plan, free).

## Running it locally

```bash
# backend
cd backend
npm install
cp .env.example .env   # add your TMDB_API_KEY here
npm start

# frontend (second terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:5173`.
