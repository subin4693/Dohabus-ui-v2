import React, { useState, useEffect } from "react";
import Banner from "../../../components/Banner";
import axios from "axios";
import Card from "./Card";
import { useSelector } from "react-redux";
import banner from "../../../assets/tourtop.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const Blogs = () => {
  const [searchParams] = useSearchParams();
  const mainuser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [recent, setRecent] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly

  const lang = useSelector((state) => state.language.lang);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (blogId) => {
    try {
      const data = await axios.delete(`${BASE_URL}/blogs/${blogId}`);

      // Update the blog state by filtering out the deleted blog
      setBlogs((prevBlogs) => {
        return prevBlogs.filter((blog) => blog._id !== blogId); // Filter out the blog by ID
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
    <div className="bg-slate-200 px-5 py-8">
      <div className=" md:flex md:gap-8">
        <div className="flex justify-between items-center w-full ">
          <h2 className="text-2xl font-bold ">Blogs</h2>
          {mainuser?.role == "super-admin" && (
            <Link
              to="/blogs-create"
              className="px-2 py-1 bg-custom-yellow rounded-md duration-300 hover:text-white text-dark hover:bg-dark "
            >
              Write blog
            </Link>
          )}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
          {blogs &&
            blogs.map((data) => (
              <Card
                handleDelete={handleDelete}
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
                isSuperAdmin={mainuser?.role === "super-admin"}
              />
            ))}
        </div>

        {/* Sidebar Content */}
      </div>
    </div>
  );
};

export default Blogs;
