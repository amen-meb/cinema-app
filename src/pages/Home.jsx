import useMovies from "../hooks/useMovies";

import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";


function Home(){


const {
movies: trending,
loading: trendingLoading,
error: trendingError
}
=
useMovies("/trending/movie/week");



const {
movies: popular,
error: popularError
}
=
useMovies("/movie/popular");



const {
movies: topRated,
error: topRatedError
}
=
useMovies("/movie/top_rated");

const {
movies: popularSeries,
error: popularSeriesError
}
=
useMovies("/tv/popular");

const {
movies: topRatedSeries,
error: topRatedSeriesError
}
=
useMovies("/tv/top_rated");



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

const requestError =
trendingError ||
popularError ||
topRatedError ||
popularSeriesError ||
topRatedSeriesError;

if (requestError) {
	return (
		<div className="mx-auto max-w-3xl rounded-xl border border-red-900 bg-red-950/60 p-8 text-center">
			<h1 className="text-2xl font-bold text-red-300">
				Movies could not be loaded
			</h1>
			<p className="mt-3 text-red-200">
				{requestError}
			</p>
			<p className="mt-4 text-sm text-gray-300">
				For Vercel, add VITE_TMDB_KEY under Settings, Environment Variables,
				then redeploy the project.
			</p>
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

<MovieRow

title="Popular Series"

movies={popularSeries}

mediaType="tv"

 />

<MovieRow

title="Top Rated Series"

movies={topRatedSeries}

mediaType="tv"

 />


</div>

);


}


export default Home;