import {
  createContext,
  useEffect,
  useReducer,
} from "react";

const WatchlistContext = createContext();

const initialState = {
  watchlist: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        watchlist: [
          ...state.watchlist,
          action.payload,
        ],
      };

    case "REMOVE_MOVIE":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function WatchlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState) => {
      const saved = localStorage.getItem(
        "cinema-watchlist"
      );

      return saved
        ? {
            watchlist: JSON.parse(saved),
          }
        : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "cinema-watchlist",
      JSON.stringify(state.watchlist)
    );
  }, [state.watchlist]);

  function addToWatchlist(movie) {
    dispatch({
      type: "ADD_MOVIE",
      payload: movie,
    });
  }

  function removeFromWatchlist(id) {
    dispatch({
      type: "REMOVE_MOVIE",
      payload: id,
    });
  }

  function isInWatchlist(id) {
    return state.watchlist.some(
      (movie) => movie.id === id
    );
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistContext;