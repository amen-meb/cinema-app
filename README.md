# Cineverse

Cineverse is a responsive movie and series discovery application powered by the [TMDB API](https://developer.themoviedb.org/docs). Browse trending titles, search across movies and shows, explore cast filmographies, watch trailers, and maintain a personal watchlist.

## Features

- Featured home hero with backdrop imagery and gradient overlay.
- Horizontal movie and series rows with smooth scroll controls.
- Responsive browse grids with 2, 3, 4, and 5-column breakpoints.
- Dynamic genre filters fetched from TMDB.
- Rating, release year, hover details, and watchlist controls on movie cards.
- Movie and series detail pages with overview, genres, cast, trailers, and similar titles.
- YouTube trailer modal with backdrop-click and close-button support.
- Debounced search for movies, television series, and people.
- Celebrity profiles with biography and combined filmography.
- Watchlist persistence through `localStorage`.
- Toast feedback when titles are added to or removed from the watchlist.
- Skeleton loading states and error handling across data-fetching views.
- Infinite scrolling and release-year range filtering on the movie browse page.
- Persisted dark/light theme preference.

## Technology

- React 19
- Vite
- React Router
- Tailwind CSS v4 with a custom `@theme` cinema design system
- Lucide React icons
- TMDB REST API
- Oxlint

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- A TMDB API key

### Installation

1. Clone the repository and move into the project directory.

   ```bash
   git clone https://github.com/amen-meb/cinema-app.git
   cd cinema-app
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root.

   ```env
   VITE_TMDB_KEY=your_tmdb_api_key
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

## Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite development server.    |
| `npm run build`   | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint`    | Run Oxlint against the project.       |


## Deployment on Vercel

1. Import the repository into Vercel.
2. Set the framework preset to **Vite** if it is not detected automatically.
3. Add `VITE_TMDB_KEY` under **Settings > Environment Variables** for the environments you use.
4. Deploy or redeploy the project.

Environment variable changes require a new deployment because Vite embeds them during the build.

