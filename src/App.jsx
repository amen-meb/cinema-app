import useMovies from "./hooks/useMovies";

function App() {
  const {
    movies,
    loading,
    error,
  } = useMovies("/movie/popular");

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>

      {movies.map((movie) => (
        <p key={movie.id}>
          {movie.title}
        </p>
      ))}
    </div>
  );
}

export default App;