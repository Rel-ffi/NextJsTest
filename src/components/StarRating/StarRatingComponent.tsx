import "./StarRating.css";
import {type FC, useState} from "react";

interface StarRatingProps {
    maxStars?: number;
}

const StarRatingComponent: FC<StarRatingProps> = ({ maxStars = 5 }) => {
    const [hoveredStar, setHoveredStar] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);

    const handleMouseEnter = (star: number) => setHoveredStar(star);
    const handleMouseLeave = () => setHoveredStar(0);
    const handleClick = (star: number) => setSelectedRating(star);

    return (
        <div className="star-rating">
            {[...Array(maxStars)].map((_, index) => {
                const starNumber = index + 1;
                const isFilled = starNumber <= (hoveredStar || selectedRating);
                return (
                    <span
                        key={starNumber}
                        className={`star ${isFilled ? "filled" : ""}`}
                        onMouseEnter={() => handleMouseEnter(starNumber)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starNumber)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRatingComponent;
