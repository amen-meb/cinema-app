import MovieCard from "./MovieCard";


function MovieRow({title,movies}){


return(

<section
className="
mb-10
"
>


<h2
className="
mb-4
text-2xl
font-bold
"
>

{title}

</h2>



<div
className="
flex
gap-5
overflow-x-auto
pb-4
"
>


{
movies.map(movie=>(
<div
key={movie.id}
className="
min-w-[200px]
"
>

<MovieCard movie={movie}/>

</div>
))
}


</div>


</section>


);


}


export default MovieRow;