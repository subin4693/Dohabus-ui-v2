import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewText: "",
    image: null,
  });
  const [showReviews, setShowReviews] = useState(false);

  const staticUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, reviewText: e.target.value });
  };

  const handleImageUpload = (e) => {
    setNewReview({ ...newReview, image: e.target.files[0] });
  };

  const handleReviewSubmit = () => {
    if (newReview.reviewText.trim() !== "") {
      setReviews([...reviews, { ...newReview, ...staticUserData }]);
      setNewReview({ reviewText: "", image: null });
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className="w-full mx-auto mt-10 p-4 border rounded shadow-lg my-10">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Write your review here..."
        value={newReview.reviewText}
        onChange={handleInputChange}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={handleImageUpload}
      />

      <button
        className="bg-custom-yellow duration-300 hover:text-white px-4 py-2 rounded-md hover:bg-dark"
        onClick={handleReviewSubmit}
      >
        Submit Review
      </button>

      <div className="mt-6">
        <button
          className="bg-dark duration-300 hover:text-black text-white px-4 py-2 rounded-md hover:bg-custom-yellow"
          onClick={toggleReviews}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>
      </div>

      {showReviews && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">All Reviews:</h3>
          <ul className="list-disc pl-5 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li key={index} className="border p-4 rounded">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.email}</p>
                  <p className="mt-2">{review.reviewText}</p>
                  {review.image && (
                    <img
                      src={URL.createObjectURL(review.image)}
                      alt="Review"
                      className="mt-4 w-full h-auto rounded"
                    />
                  )}
                </li>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reviews;
