import useMovies from "../hooks/useMovies";

import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";


function Home(){


const {
movies: trending,
loading: trendingLoading
}
=
useMovies("/trending/movie/week");



const {
movies: popular
}
=
useMovies("/movie/popular");



const {
movies: topRated
}
=
useMovies("/movie/top_rated");



if(trendingLoading){

return (

<div
className="
text-center
text-2xl
"
>

Loading movies...

</div>

);

}



const featuredMovie = trending[0];



return (

<div
className="
space-y-12
"
>


{/* Hero */}

<HeroBanner movie={featuredMovie}/>



{/* Trending */}

<MovieRow

title="Trending This Week"

movies={trending}

loading={trendingLoading}

/>



{/* Popular */}

<MovieRow

title="Popular Movies"

movies={popular}

/>



{/* Top Rated */}

<MovieRow

title="Top Rated Movies"

movies={topRated}

/>


</div>

);


}


export default Home;