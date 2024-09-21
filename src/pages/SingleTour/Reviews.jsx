import React, { useState, useEffect } from "react";
import useFirebaseUpload from "../../hooks/use-firebaseUpload";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTripadvisor } from "react-icons/fa";
import { Link } from "react-router-dom";
const Reviews = ({
    canWriteReview,
    reviews,
    setReviews,
    newReview,
    setNewReview,
    handleReviewSubmit,
    user,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [file, setFile] = useState(null);
    const [showReviews, setShowReviews] = useState(false);

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, reviewText: e.target.value });
    };

    const handleImageUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveReview = async (reviewId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
                params: user ? { user: user?._id } : {},
            });

            if (res.status === 204) {
                setReviews((prevReviews) =>
                    prevReviews.filter((review) => review._id !== reviewId)
                );
                toast.success("Review Removed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error(
                "Error deleting review:",
                error.response?.data || error.message
            );
            toast.error("Failed to remove review", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const { progress, error, downloadURL } = useFirebaseUpload(file);

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    useEffect(() => {
        if (downloadURL) {
            setNewReview({ ...newReview, imageURL: downloadURL });
        }
    }, [downloadURL]);

    return (
        <div className="w-[80vw] mx-auto mt-10 p-4 border rounded shadow-lg my-10">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            {canWriteReview && (
                <>
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
                    {progress > 0 && progress < 100 && (
                        <p>Upload Progress: {progress}%</p>
                    )}
                    {error && <p>Error: {error}</p>}
                    <button
                        className="bg-custom-yellow duration-300 hover:text-white px-4 py-2 rounded-md hover:bg-dark"
                        onClick={() => {
                            if (progress > 0 && progress < 100) return;

                            handleReviewSubmit();
                        }}
                    >
                        Submit Review
                    </button>
                </>
            )}

            <div className="mt-6 flex  items-center gap-5">
                <button
                    className="bg-dark duration-300 hover:text-black text-white px-4 py-2 rounded-md hover:bg-custom-yellow"
                    onClick={toggleReviews}
                >
                    {showReviews ? "Hide Reviews" : "View Reviews"}
                </button>
                <Link
                    to="https://www.tripadvisor.com/Attraction_Review-g294009-d6215547-Reviews-Doha_Bus-Doha.html"
                    className="bg-dark duration-300 hover:text-black text-white px-4 py-2 rounded-md hover:bg-custom-yellow flex justify-center items-center gap-3"
                >
                    <FaTripadvisor className="text-2xl" />
                    View Trip advisor reviews
                </Link>
            </div>

            {showReviews && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">All Reviews:</h3>
                    <ul className="list-disc pl-5 space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <li key={index} className="border p-4 rounded">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">
                                                {review.user?.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {review.user?.email}
                                            </p>
                                        </div>
                                        <div>
                                            {/* Conditionally render the delete button */}
                                            {(user.email ===
                                                review.user?.email ||
                                                user.role ===
                                                    "super-admin") && (
                                                <BsTrash
                                                    onClick={() =>
                                                        handleRemoveReview(
                                                            review._id
                                                        )
                                                    }
                                                    size={30}
                                                    className="cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-2">{review.reviewText}</p>
                                    {review.imageURL && (
                                        <img
                                            src={review.imageURL}
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
