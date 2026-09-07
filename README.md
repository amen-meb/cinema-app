# Cinema App

## Setup

1. Create a TMDB account and generate an API key from the [TMDB API settings](https://www.themoviedb.org/settings/api).
2. Create a `.env` file in the project root:

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

3. Restart the Vite server with `npm run dev`.

The app cannot fetch movies until `VITE_TMDB_KEY` is set. Do not commit the `.env` file.

### Vercel deployment

In the Vercel project, open **Settings > Environment Variables**, add
`VITE_TMDB_KEY` with your TMDB API key, select the required environments, and
redeploy. Vite embeds `VITE_` variables during the build, so changing the
variable requires a new deployment.

## Pages & Navigation

● Home page: trending, popular, and top-rated movies and series rows

● Movies page: full movie catalogue with genre filter and sort

● Movie Detail page: full information, trailer, cast, and similar movies

● Series page: full series catalogue with genre filter and sort

● Series Detail page: full information, trailer, cast, and similar series

● Search page: debounced search for movies, series, and celebrities

● Celebrities page: popular celebrity catalogue

● Celebrity Detail page: biography and movies or series worked on

● Watchlist page: saved movies with add/remove functionality using LocalStorage

● 404 Not Found page

<!-- The remaining sections below are the original Vite setup notes. -->

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
