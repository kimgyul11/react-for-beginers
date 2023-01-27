import PropType from "prop-types";
import { Link } from "react-router-dom";
import style from "./Movie.module.css";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className={style.movie}>
      <img src={coverImg} alt={title} className={style.movie__img} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <div className={style.movie__summary}>
        <p>{summary}</p>
      </div>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.prototype = {
  id: PropType.number.isRequired,
  coverImg: PropType.string.isRequired,
  title: PropType.string.isRequired,
  summary: PropType.string.isRequired,
  genres: PropType.arrayOf(PropType.string).isRequired,
};
export default Movie;
