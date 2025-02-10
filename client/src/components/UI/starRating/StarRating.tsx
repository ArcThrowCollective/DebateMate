import './StarRating.css';
import { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface StarRatingProps {
  maxStars?: number;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  onChange,
}) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={starNumber}
            className="star"
            onClick={() => handleRatingClick(starNumber)}
          >
            {starNumber <= selectedRating ? (
              <IoMdStar className="filled-star" />
            ) : (
              <IoMdStarOutline className="outline-star" />
            )}
          </span>
        );
      })}
    </div>
  );
};
