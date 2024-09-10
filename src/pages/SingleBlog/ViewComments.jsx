import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentsList = ({ blogId, comments }) => {
    // const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-md shadow-md my-6">
            <h3 className="text-lg font-bold mb-4">Comments / التعليقات</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="border-b border-gray-200 pb-4 mb-4"
                    >
                        <h4 className="font-bold">{comment.name}</h4>
                        <p className="text-sm text-gray-500">{comment.email}</p>
                        <p className="text-gray-700 mt-2">{comment.comment}</p>
                    </div>
                ))
            ) : (
                <p>
                    No comments yet. Be the first to comment! / لا توجد تعليقات
                    حتى الآن. كن أول من يعلق!
                </p>
            )}
        </div>
    );
};

export default CommentsList;
