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

        // if (!cat || !cat.trim()) {
        //     toast.warn("Category is required and cannot be empty.", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        //     return;
        // }
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
                { withCredentials: true }
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
        <section
            className="px-10 py-[150px] min-h-screen   "
            style={{
                direction: lang === "ar" ? "rtl" : "ltr",
            }}
        >
            <h1 className="text-3xl font-bold">
                {lang === "ar" ? "اكتب مدونة" : "Write blog"}
            </h1>
            <br />

            <select
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 rounded-md"
            >
                <option value="">
                    {lang === "ar" ? "اختر الفئة" : "Select Category"}
                </option>
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
                {url
                    ? lang === "ar"
                        ? "تغيير الصورة"
                        : "Change image"
                    : lang === "ar"
                    ? "صورة الغلاف"
                    : "Cover image"}
            </label>

            {progress > 0 && progress < 100 && (
                <h2 className="mt-5 ">
                    {progress} %
                    {lang === "ar"
                        ? "جاري تحميل الصورة..."
                        : "Image uploading..."}
                </h2>
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
                placeholder={lang === "ar" ? "العنوان..." : "Title..."}
                className="text-xl border-2 outline-none p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />
            <p></p>

            <ReactQuill
                style={{
                    direction: lang === "ar" ? "rtl" : "ltr",
                }}
                theme="bubble"
                value={value}
                onChange={setValue}
                placeholder={
                    lang === "ar" ? "ابدأ المدونة هنا..." : "Start blog here..."
                }
                className="w-full h-[40vh] border-2 text-2xl "
                modules={{
                    toolbar: [
                        [{ size: ["small", false, "large", "huge"] }], // Custom font sizes
                        ["bold", "italic", "underline"],
                        [{ color: ["red"] }], // Add color selector
                        [{ align: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                    ],
                }}
            />

            <div className="text-right mt-5">
                <button
                    className="bg-green-500 text-white py-2 rounded-sm px-5"
                    onClick={handleSubmit}
                >
                    {lang === "ar" ? "انشر" : "Post"}
                </button>
            </div>
        </section>
    );
};

export default Write;
