import "./MoviesGrid.css";
import MovieCardComponent from "../MoviesCard/MoviesCardComponent";
import type {IMovie} from "@/types/movie.types";
import type {FC} from "react";

interface MoviesGridComponentProps {
    movies: IMovie[];
}

const MoviesGridComponent: FC<MoviesGridComponentProps> = ({ movies }) => {
    return (
        <div className="movies-grid">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <MovieCardComponent key={movie.id} movie={movie} />
                ))
            ) : (
                <p className="no-movies">No liked film&apos;s yet</p>
            )}
        </div>
    );
};

export default MoviesGridComponent;
