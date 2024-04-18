import React from 'react';

const RatingBar = ({ ratings }) => {
  const totalRatings = ratings.reduce((acc, cur) => acc + cur, 0);
  const totalStars = ratings.reduce((acc, cur, index) => acc + (cur * (index + 1)), 0);
  const averageRating = totalStars / totalRatings || 0;

  return (
    <div className="flex flex-col">
      <div className="ml-2">Average Rating: {averageRating.toFixed(2)} . {totalStars} Reviews</div>  
      <div className="flex items-center">
        <div className="flex-none w-24 mr-2">1: </div>
        <div className="flex-grow h-4 relative bg-gray-200 rounded">
          <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{ width: `${(ratings[0] / totalRatings) * 100}%` }}></div>
        </div>
        <div className="ml-2">{ratings[0]}</div>
      </div>

      <div className="flex items-center">
        <div className="flex-none w-24 mr-2">2: </div>
        <div className="flex-grow h-4 relative bg-gray-200 rounded">
          <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{ width: `${(ratings[1] / totalRatings) * 100}%` }}></div>
        </div>
        <div className="ml-2">{ratings[1]}</div>
      </div>

      <div className="flex items-center">
        <div className="flex-none w-24 mr-2">3: </div>
        <div className="flex-grow h-4 relative bg-gray-200 rounded">
          <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{ width: `${(ratings[2] / totalRatings) * 100}%` }}></div>
        </div>
        <div className="ml-2">{ratings[2]}</div>
      </div>

      <div className="flex items-center">
        <div className="flex-none w-24 mr-2">4: </div>
        <div className="flex-grow h-4 relative bg-gray-200 rounded">
          <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{ width: `${(ratings[3] / totalRatings) * 100}%` }}></div>
        </div>
        <div className="ml-2">{ratings[3]}</div>
      </div>

      <div className="flex items-center">
        <div className="flex-none w-24 mr-2">5: </div>
        <div className="flex-grow h-4 relative bg-gray-200 rounded">
          <div className="absolute left-0 top-0 h-full bg-yellow-400" style={{ width: `${(ratings[4] / totalRatings) * 100}%` }}></div>
        </div>
        <div className="ml-2">{ratings[4]}</div>
      </div>

      
    </div>
  );
}

export default RatingBar;


