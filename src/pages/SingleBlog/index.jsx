// SingleBlog.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import banner from "../../assets/tourtop.jpg"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import ViewComments from "./ViewComments";
import WriteReview from "./WriteReview";
import { toast } from "react-toastify";

const SingleBlog = () => {
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [recent, setRecent] = useState([]);
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const lang = useSelector((state) => state.language.lang);
    const navigate = useNavigate();
    const email = useSelector((state) => state?.user?.user?.email);
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSubmit = async (name, email, comment) => {
        if (!name.trim() || !email.trim() || !comment.trim()) {
            return toast.warn("All fields are required", {
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

        try {
            console.log({
                name,
                email,
                comment,
            });
            const resComment = await axios.post(
                `${BASE_URL}/blogs/${id}/comments`,
                {
                    name,
                    email,
                    comment,
                }
            );
            setBlog((prev) => ({
                ...prev,
                comments: resComment.data.data.comments,
            }));

            toast.success("Comment posted", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // Callback to update the comment list
        } catch (error) {
            toast.error("Something went wrong please try again later", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error);
        }
    };
    const handleDelete = async (blogId, commentId) => {
        try {
            const res = await axios.delete(
                `${BASE_URL}/blogs/${blogId}/comments/${commentId}`
            );

            // Update the blog state by filtering out the deleted comment
            setBlog((prev) => {
                return {
                    ...prev, // Create a copy of the previous blog object
                    comments: prev.comments.filter(
                        (com) => com._id !== commentId
                    ), // Filter out the comment by ID
                };
            });

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blogs/${id}`);
                setBlog(response?.data?.data?.blog);
                console.log(response?.data?.data?.blog);

                const blogData = await axios.get(BASE_URL + "/blogs?limit=2");
                setBlogs(blogData.data.data.blogs);

                const categoryData = await axios.get(`${BASE_URL}/categorys`);
                setCategorys(categoryData?.data?.data?.categories);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogData();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(BASE_URL + "/blogs/recent");
                console.log(data?.data?.data?.blogs);
                setRecent(data?.data?.data?.blogs);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="bg-slate-200 pt-[100px]">
            <div className="md:container  mx-auto px-4 py-8 md:flex md:gap-8">
                {/* Main Content */}
                <div className="flex-1 grid gap-5 md:w-3/4">
                    <div className="bg-white p-6 rounded-lg shadow-md ">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {blog.title}
                                </h1>
                            </div>
                            {blog?.plan?.title[lang] && (
                                <h3 className="text-sm font-bold text-gray-700 rounded-md bg-custom-yellow w-fit px-4 py-1">
                                    {console.log(blog)}

                                    {blog?.plan?.title[lang]}
                                </h3>
                            )}
                        </div>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-auto object-cover mb-4 rounded-lg"
                        />
                        <p className="text-sm text-gray-500 mb-2">
                            {formatDate(blog.createdAt)}
                        </p>
                        <div
                            className="text-gray-800 mb-4"
                            dangerouslySetInnerHTML={{ __html: blog.text }}
                        ></div>
                        <div className="flex items-center text-sm text-gray-600">
                            {/* <span className="mr-4 flex justify-center items-center">
                                <IoIosHeart className="  text-2xl" /> &nbsp;
                                {blog.likes} Likes
                            </span>*/}
                            <span className="mr-4 flex justify-center items-center">
                                <FaCommentAlt className="  text-xl" /> &nbsp;
                                {blog?.comments?.length} Comments
                            </span>
                        </div>
                    </div>
                    <WriteReview
                        blogId={blog?._id}
                        handleSubmit={handleSubmit}
                        lang={lang}
                    />

                    <ViewComments
                        blogId={blog?._id}
                        comments={blog?.comments}
                        email={email}
                        handleDelete={handleDelete}
                    />
                </div>

                {/* Sidebar Content */}
                <div className="w-full md:w-1/4 bg-white p-4 space-y-8 h-fit rounded-lg">
                    {/* Search Box */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder={lang === "ar" ? "بحث..." : "Search..."}
                            className="w-full p-2 border border-gray-300 rounded"
                            style={{
                                direction: lang === "ar" ? "rtl" : "ltr",
                            }}
                        />
                    </div>

                    {/* Recent Posts */}
                    <div className="recent-posts mb-6">
                        <h3
                            className="text-lg font-bold mb-4"
                            style={{
                                direction: lang === "ar" ? "rtl" : "ltr", // Apply text direction based on the language
                            }}
                        >
                            {lang === "ar"
                                ? "المنشورات الأخيرة"
                                : "Recent Posts"}
                        </h3>
                        {recent?.map((post) => (
                            <Link
                                to={`/blogs/${post?._id}`}
                                key={post._id}
                                className="flex items-start mb-4 "
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h4 className="text-sm">
                                        {post.plan?.title[lang]}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {formatDate(post.createdAt)}
                                    </p>
                                    <p className="text-xl font-bold text-gray-700 line-clamp-1">
                                        {post.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="categories mb-6">
                        <h3
                            className="text-lg font-bold mb-4 "
                            style={{
                                direction: lang === "ar" ? "rtl" : "ltr", // Apply text direction based on the language
                            }}
                        >
                            {lang === "ar" ? "الفئات" : "Categories"}
                        </h3>
                        <ul className="flex flex-wrap gap-3 pl-2 text-sm text-gray-700">
                            {categorys.map((category) => (
                                <li
                                    key={category._id}
                                    className="border border-gray-200 px-3 py-2 rounded-md cursor-pointer"
                                    onClick={() =>
                                        navigate(`/blogs?cat=${category._id}`)
                                    }
                                >
                                    {category.title[lang]}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscription Field */}
                    <div className="subscription mb-6">
                        <h3
                            className="text-lg font-bold mb-4"
                            style={{
                                direction: lang === "ar" ? "rtl" : "ltr", // Apply text direction based on the language
                            }}
                        >
                            {lang === "ar"
                                ? "اشترك في نشرتنا الإخبارية"
                                : "Subscribe to Our Newsletter"}
                        </h3>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder={lang === "ar" ? "الاسم" : "Name"}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                style={{
                                    direction: lang === "ar" ? "rtl" : "ltr",
                                }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder={
                                    lang === "ar"
                                        ? "البريد الإلكتروني"
                                        : "Email"
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                style={{
                                    direction: lang === "ar" ? "rtl" : "ltr",
                                }}
                            />
                            <button
                                type="submit"
                                className="w-full p-2 bg-custom-yellow text-white font-bold rounded"
                            >
                                {lang === "ar" ? "اشترك" : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
