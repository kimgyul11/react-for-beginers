import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.background_image} alt={movie.title} />
          <h1>{movie.title}</h1>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <h2>description: {movie.description_full}</h2>
          <h2>rating: {movie.rating}</h2>
        </div>
      )}
    </div>
  );
}
export default Detail;
