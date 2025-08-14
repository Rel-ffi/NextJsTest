import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setPage} from "@/features/movies/moviesSlice";
import {fetchMovies, fetchSearchedMovies} from "@/features/movies/moviesThunk";
import "./PaginationComponent.css";
import type {FC} from "react";

const PaginationComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { page, totalPages, isSearching, searchQuery } = useAppSelector((state) => state.movies);
    const activeGenre = useAppSelector((state) => state.genres.activeGenre);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        dispatch(setPage(newPage));

        if (isSearching) {
            dispatch(fetchSearchedMovies({ query: searchQuery, page: newPage }));
        } else {
            dispatch(fetchMovies({ page: newPage, genreId: activeGenre }));
        }
    };

    return (
        <div className="pagination-container">
            <button
                className="pg-buttons"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
            >Prev</button>

            <span className="pg-text">
                Page {page} of {totalPages}
            </span>

            <button
                className="pg-buttons"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
            >Next</button>
        </div>
    );
};

export default PaginationComponent;
