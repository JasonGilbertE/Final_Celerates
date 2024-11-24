const RatingCard = ({ review }) => {
  return (
    <div className="bg-white border-4 border-[#C62E2E] mx-5 ml-10 my-4 rounded-md px-4 py-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={review.imageUrl}
          alt={`Profile of ${review.name}`}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{review.name}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <i className="fas fa-star text-yellow-400 mr-1"></i>
            </div>
            <span className="font-medium">{review.rating}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.reviewText}</p>
    </div>
  );
};

export default RatingCard; // RatingCard diekspor di sini
