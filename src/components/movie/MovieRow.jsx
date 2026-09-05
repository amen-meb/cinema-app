import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";


function MovieRow({
title,
movies=[],
loading=false
}){


return (

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

loading

?

Array.from({length:6}).map((_,index)=>(

<div
key={index}
className="
min-w-[200px]
"
>

<SkeletonCard/>

</div>


))


:


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