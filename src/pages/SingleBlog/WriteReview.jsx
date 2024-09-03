import React, { useState } from "react";
import axios from "axios";

const WriteReview = ({ blogId, handleSubmit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Write a Comment</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    return handleSubmit(name, email, comment);
                }}
            >
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-custom-yellow duration-300 hover:text-white hover:bg-dark text-black font-bold rounded"
                >
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default WriteReview;
