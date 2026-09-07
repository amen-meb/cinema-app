import MovieCard from "./MovieCard";


function MovieGrid({movies}) {


return (

<div
className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-4
xl:grid-cols-5
gap-5
"
>


{
movies.map(movie=>(
<MovieCard
key={movie.id}
movie={movie}
/>
))
}


</div>


);


}


export default MovieGrid;