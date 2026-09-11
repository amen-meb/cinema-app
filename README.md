# Cineverse - Cinema App

A modern movie discovery and watchlist application built with **React, Vite, Tailwind CSS, and the TMDB API**.

Cineverse lets users discover trending and popular movies, explore movies by genre, search for movies, TV series, and celebrities, view detailed information, watch trailers, and manage a personal watchlist.



### Technologies

- React 19
- Vite
- Tailwind CSS v4
- TMDB API


## Features
- Home Page
- Movies Page
- Series Page
- Search


Search uses a debounced input to reduce unnecessary API requests and supports URL query parameters from the navbar search field.

- Movie and Series Details


### Watchlist

Users can:

- Add titles to their watchlist
- Remove titles from their watchlist
- View saved titles
- See the watchlist count in the navbar
- Persist the watchlist using LocalStorage

### Trailer Modal

- YouTube trailer integration


### Responsive Design

The application is responsive across mobile, tablet, desktop, and large screens. Movie grids use 2 columns on mobile, 3 on tablet, 4 on desktop, and 5 on wide screens.

