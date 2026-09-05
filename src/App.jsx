import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";


import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";


function App(){


return (

<div 
className="
min-h-screen
bg-zinc-950
text-white
"
>


<Navbar/>


<main
className="
pt-24
px-5
"
>


<Routes>


<Route 
path="/"
element={<Home/>}
/>


<Route 
path="/movies"
element={<Browse/>}
/>


<Route 
path="/movie/:id"
element={<MovieDetail/>}
/>


<Route 
path="/search"
element={<SearchResults/>}
/>


<Route 
path="/watchlist"
element={<Watchlist/>}
/>


<Route 
path="*"
element={<NotFound/>}
/>


</Routes>


</main>


</div>


);


}


export default App;