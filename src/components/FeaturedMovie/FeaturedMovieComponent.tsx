import {type FC, useEffect, useState} from "react";
import {getMovieVideo} from "@/services/movies.api.service";
import "./FeaturedMovie.css";
import TrailerModalComponent from "../TrailerModalComponent/TrailerModalComponent";
import type {IMovie} from "@/types/movie.types";
import {useRouter} from "next/navigation";

interface FeaturedMovieComponentProps {
    movie: IMovie;
}

const FeaturedMovieComponent: FC<FeaturedMovieComponentProps> = ({ movie }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await getMovieVideo(movie.id);
                const videos = response.data.results || [];
                const trailer = videos.find(
                    (v: { type: string; site: string; key: string }) => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailerKey(trailer ? trailer.key : null);
            } catch (err) {
                console.error("Failed to load trailer:", err);
                setError("Failed to load trailer, please try again later");
                setTrailerKey(null);
            }
        };

        fetchTrailer().catch((error:ErrorEvent) => {
            console.error("Error fetching trailer:", error);
        });
    }, [movie.id]);

    const handlePlayClick = () => {
        setIsModalOpen(true);
    };

    const handleMoreInfo = () => {
        router.push(`/movie/${movie.id}`);
    };

    return (
        <>
            <div
                className="fm-featured-movie"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
                }}>
                <div className="fm-overlay">
                    <div className="fm-content">
                        <h2 className="fm-title">{movie.title}</h2>
                        <p className="fm-overview">
                            {movie.overview.length > 200
                                ? `${movie.overview.slice(0, 200)}...`
                                : movie.overview}
                        </p>
                        {error && <p className="fm-error">{error}</p>}
                        <div className="fm-buttons">
                            <button
                                className="fm-play-button"
                                onClick={handlePlayClick}
                            >
                                ▶ Play
                            </button>
                            <button
                                className="fm-info-button"
                                onClick={handleMoreInfo}
                            >
                                ℹ More Info
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

export default FeaturedMovieComponent;
