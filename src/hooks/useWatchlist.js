import { useContext } from "react";

import WatchlistContext from "../context/WatchlistContext";

function useWatchlist() {
  return useContext(WatchlistContext);
}

export default useWatchlist;