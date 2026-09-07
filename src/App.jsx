import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Series from "./pages/Series";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import Celebrities from "./pages/Celebrities";
import CelebrityDetail from "./pages/CelebrityDetail";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Toast from "./components/ui/Toast";
import useToast from "./hooks/useToast";


function App(){

const { toast } = useToast();

return (

<div
className="
min-h-screen
bg-zinc-950
text-white
"
>


<Navbar/>


<main className="pt-24 px-5">


  <Routes>


    <Route path="/" element={<Home/>}/>

    <Route path="/movies" element={<Browse/>}/>

    <Route path="/series" element={<Series/>}/>

    <Route path="/movie/:id" element={<MovieDetail/>}/>

    <Route path="/series/:id" element={<SeriesDetail/>}/>

    <Route path="/celebrities" element={<Celebrities/>}/>

    <Route path="/celebrity/:id" element={<CelebrityDetail/>}/>

    <Route path="/search" element={<SearchResults/>}/>

    <Route path="/watchlist" element={<Watchlist/>}/>

    <Route path="*" element={<NotFound/>}/>


  </Routes>


</main>

<Footer />

<Toast message={toast}/>

</div>

);

}


export default App;