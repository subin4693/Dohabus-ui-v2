import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import axios from "axios";
import Card from "./Card";
import { useSelector } from "react-redux";
import banner from "../../assets/tourtop.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
const Blogs = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [categorys, setCategorys] = useState([]);

    const [recent, setRecent] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly

    const lang = useSelector((state) => state.language.lang);
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const catParam = searchParams.get("cat");
                const blogsUrl = catParam
                    ? `${BASE_URL}/blogs?cat=${catParam}`
                    : `${BASE_URL}/blogs`;

                const blogData = await axios.get(blogsUrl);
                setBlogs(blogData.data.data.blogs);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [searchParams]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(BASE_URL + "/blogs/recent");
                console.log(data.data.data.blogs);
                setRecent(data.data.data.blogs);
                const categoryData = await axios.get(BASE_URL + "/categorys");
                setCategorys(categoryData?.data?.data?.categories);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className="bg-slate-200">
            <Banner
                image={banner}
                title={lang === "en" ? "Blogs" : "الفنادق"}
                subTitle={lang === "en" ? "Home | Blogs" : "الرئيسية | الفنادق"}
            />
            <div className="md:container mx-auto px-4 py-8 md:flex md:gap-8">
                {/* Main Content */}
                <div className="flex-1 grid gap-5 md:w-3/4">
                    {blogs &&
                        blogs.map((data) => (
                            <Card
                                id={data._id}
                                key={data._id} // Add a unique key for each item in the list
                                comments={data.comments}
                                createdAt={data.createdAt}
                                image={data.image}
                                likes={data.likes}
                                categorie={data.plan}
                                text={data.text}
                                user={data.user}
                                lang={lang}
                                title={data.title}
                                formatDate={formatDate}
                            />
                        ))}
                </div>

                {/* Sidebar Content */}
                <div className="w-full md:w-1/4 bg-white p-4 space-y-8 h-fit rounded-lg">
                    {/* Search Box */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Recent Posts */}
                    <div className="recent-posts mb-6">
                        <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
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
                                    <h4 className="text-sm ">
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
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
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
                        <h3 className="text-lg font-bold mb-4">
                            Subscribe to Our Newsletter
                        </h3>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                            />
                            <button
                                type="submit"
                                className="w-full p-2 bg-custom-yellow text-white font-bold rounded"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
