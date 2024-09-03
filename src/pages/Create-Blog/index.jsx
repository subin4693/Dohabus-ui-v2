import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useFirebaseUpload from "../../hooks/use-firebaseUpload";
const Write = () => {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [cat, setCat] = useState(null);
    const [file, setFile] = useState(null);
    const lang = useSelector((state) => state.language.lang);

    const [categorys, setCategorys] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url.trim()) {
            toast.warn("Image is required and cannot be empty.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!title.trim()) {
            toast.warn("Title is required and cannot be empty.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!value.trim()) {
            toast.warn("Content value is required and cannot be empty.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!cat || !cat.trim()) {
            toast.warn("Category is required and cannot be empty.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        console.log({
            image: url,
            title,
            text: value,

            plan: cat,
        });
        try {
            const res = await axios.post(
                BASE_URL + "/blogs",
                {
                    image: url,
                    title,
                    text: value,

                    plan: cat,
                },
                { withCredentials: true },
            );
            toast.success("New blog created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/blogs");
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
        }
    };

    const { progress, error, downloadURL } = useFirebaseUpload(file);

    useEffect(() => {
        if (downloadURL) {
            setUrl(downloadURL);
        }
    }, [downloadURL]);
    useEffect(() => {
        const getData = async () => {
            try {
                const categoryData = await axios.get(BASE_URL + "/categorys");
                console.log(categoryData?.data?.data?.categories);

                setCategorys(categoryData?.data?.data?.categories);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    return (
        <section className="   px-10 py-[150px]">
            <h1 className="text-3xl font-bold ">Write blog</h1>
            <br />
            <select
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 rounded-md"
            >
                <option value="">Select Category</option>
                {categorys.map((val) => (
                    <option value={val?._id}>{val?.title[lang]}</option>
                ))}
            </select>
            <br />
            <br />
            <label
                htmlFor="image"
                className="bg-yellow-200 px-3 py-2 cursor-pointer"
            >
                {url ? "Change image" : "Cover image"}
            </label>

            {progress > 0 && progress < 100 && (
                <h2 className="mt-5 ">{progress} % Image uploading...</h2>
            )}
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
            />

            {url && (
                <>
                    <br />
                    <br />
                    <img src={url} height="200" width="200" alt="blog image" />
                </>
            )}

            <br />
            <br />

            <input
                type="text"
                placeholder="Title..."
                className="text-xl border-2 outline-none p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <ReactQuill
                theme="bubble"
                value={value}
                onChange={setValue}
                placeholder="Start blog here..."
                className="w-full h-[40vh] border-2"
            />
            <div className="text-right mt-5">
                <button
                    className="bg-green-500  text-white py-2 rounded-sm px-5 "
                    onClick={handleSubmit}
                >
                    Post
                </button>
            </div>
        </section>
    );
};

export default Write;
