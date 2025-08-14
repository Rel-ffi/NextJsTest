import {type FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {addFavorite, removeFavorite} from "@/features/favorites/favoritesSlice";
import {getMovieVideo} from "@/services/movies.api.service";
import TrailerModalComponent from "../TrailerModalComponent/TrailerModalComponent";
import StarRatingComponent from "../StarRating/StarRatingComponent";
import "./MovieDetailsComponent.css";
import type {IMovie} from "@/types/movie.types";
import type {ErrorInfo} from "react-dom/client";

interface MovieDetailsComponentProps {
    movieDetails: IMovie | null;
    loading: boolean;
    error: string | null;
}

const MovieDetailsComponent: FC<MovieDetailsComponentProps> = ({ movieDetails, loading, error }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.movies);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    const isFavorite = favorites.some((fav) => fav.id === movieDetails?.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movieDetails!.id));
        } else {
            dispatch(addFavorite(movieDetails!));
        }
    };

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                if (movieDetails?.id) {
                    const response = await getMovieVideo(movieDetails.id);
                    const videos = response.data.results || [];
                    const trailer = videos.find(
                        (v: { type: string; site: string; key: string }) => v.type === "Trailer" && v.site === "YouTube"
                    );
                    setTrailerKey(trailer ? trailer.key : null);
                }
            } catch (err) {
                console.error("Failed to load trailer:", err);
                setTrailerKey(null);
            }
        };

        fetchTrailer().catch((error:ErrorInfo) => {
            console.error("Error fetching trailer:", error);
        });
    }, [movieDetails]);

    const handlePlayClick = () => {
        setIsModalOpen(true);
    };

    if (loading) return <p className="loading">Loading movie details...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!movieDetails) return <p>No movie data.</p>;

    return (
        <>
            <div
                className="md-container"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
                }}
            >
                <div className="md-overlay">
                    <div className="md-content">
                        <h1 className="md-title">{movieDetails.title}</h1>
                        <p className="md-tagline">{movieDetails.tagline || "No tagline available"}</p>
                        <div className="md-genres">
                            {movieDetails.genres.map((genre) => (
                                <span key={genre.id} className="md-genre-badge">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <p className="md-overview">{movieDetails.overview}</p>
                        <div className="md-meta">
                            <span>⭐ {movieDetails.vote_average}</span>
                            <span>🕒 {movieDetails.runtime} min</span>
                            <span>🎬 {movieDetails.release_date}</span>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                            <p>Rating film:</p>
                            <StarRatingComponent />
                        </div>

                        <div className="md-buttons">
                            <button
                                className="md-trailer-button"
                                onClick={handlePlayClick}
                            >
                                ▶ Watch Trailer
                            </button>
                            <button
                                className={`md-like-button ${isFavorite ? "liked" : ""}`}
                                onClick={toggleFavorite}
                            >
                                {isFavorite ? "❤️ Liked" : "🤍 Like"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TrailerModalComponent
                isOpen={isModalOpen}
                trailerKey={trailerKey}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default MovieDetailsComponent;
