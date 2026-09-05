import { Link } from "react-router-dom";


const IMAGE_URL =
"https://image.tmdb.org/t/p/original";


function HeroBanner({movie}) {


if(!movie){
    return null;
}


return (

<section
className="
relative
h-[80vh]
overflow-hidden
rounded-xl
"
>


{/* Background Image */}

<img

src={`${IMAGE_URL}${movie.backdrop_path}`}

alt={movie.title}

className="
absolute
inset-0
h-full
w-full
object-cover
"

/>



{/* Gradient Overlay */}

<div

className="
absolute
inset-0
bg-gradient-to-r
from-black
via-black/60
to-transparent
"

/>



{/* Content */}

<div

className="
relative
z-10
flex
h-full
max-w-3xl
flex-col
justify-center
px-8
"

>


<h1

className="
text-4xl
font-bold
md:text-6xl
"

>

{movie.title}

</h1>



<p

className="
mt-4
text-gray-300
line-clamp-3
"

>

{movie.overview}

</p>



<div

className="
mt-6
flex
gap-4
"

>


<Link

to={`/movie/${movie.id}`}

className="
rounded-lg
bg-red-600
px-6
py-3
font-semibold
hover:bg-red-700
"

>

View Details

</Link>



</div>


</div>


</section>

);


}


export default HeroBanner;