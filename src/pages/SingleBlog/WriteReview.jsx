import React, { useState } from "react";
import axios from "axios";

const WriteReview = ({ blogId, handleSubmit, lang }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    return (
        <div
            className="bg-white p-6 rounded-md shadow-md"
            style={{
                direction: lang === "ar" ? "rtl" : "ltr",
            }}
        >
            {lang == "ar" ? "اكتب تعليق" : "Write a Comment"}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setName("");
                    setEmail("");
                    setComment("");
                    handleSubmit(name, email, comment);
                }}
            >
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={lang == "ar" ? "اسم" : "Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder={
                            lang == "ar" ? "البريد الإلكتروني" : "Email"
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder={lang == "ar" ? "تعليق" : "Comment"}
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
                    {lang == "ar" ? "إرسال التعليق" : "Submit Comment"}
                </button>
            </form>
        </div>
    );
};

export default WriteReview;
