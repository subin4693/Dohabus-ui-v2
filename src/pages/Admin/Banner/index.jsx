import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls
import useFirebaseUpload from "../../../hooks/use-firebaseUpload"; // Import your custom Firebase hook

const Banner = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [slide, setSlide] = useState([
        {
            _id: "asdfa1",
            url: "https://example1.com",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
        },
        {
            _id: "asdfa2",
            url: "https://example2.com",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
        },
        {
            _id: "asdfa3",
            url: "https://example3.com",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
        },
        {
            _id: "asdfa4",
            url: "https://example4.com",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
        },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newImage, setNewImage] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [file, setFile] = useState(null);

    // Use your custom hook to handle Firebase uploads
    const { progress, error, downloadURL } = useFirebaseUpload(file);

    useEffect(() => {
        if (downloadURL) {
            setNewImage(downloadURL); // Set the image to the Firebase download URL after upload
        }
    }, [downloadURL]);

    const handleEdit = (index) => {
        setEditIndex(index);
        setIsEditing(true);
        setNewImage(slide[index].image);
        setNewUrl(slide[index].url);
    };

    const handleSave = async () => {
        const updatedSlide = {
            ...slide[editIndex],
            image: newImage,
            url: newUrl,
        };
        const updatedSlides = [...slide];
        updatedSlides[editIndex] = updatedSlide;

        setIsEditing(false);
        setEditIndex(null);

        try {
            await axios.put(
                `${BASE_URL}/banner/${updatedSlide._id}`,
                updatedSlide
            );
            setSlide(updatedSlides);
            toast.success("Banner updated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (err) {
            console.error("Error updating banner:", err);

            toast.error("Failed to update banner.", {
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

    const handleAddNew = () => {
        setIsEditing(true);
        setEditIndex(null); // Indicate that this is a new addition
        setNewImage("");
        setNewUrl("");
    };

    const handleAddNewSave = async () => {
        const newSlide = {
            image: newImage,
            url: newUrl,
        };
        setSlide([...slide]);
        setIsEditing(false);
        console.log(newSlide);
        try {
            const res = await axios.post(`${BASE_URL}/banner`, newSlide);
            console.log(res.data.data.banner);
            const val = res.data.data.banner;
            setSlide([...slide, val]);

            toast.success("New banner added successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (err) {
            console.error("Error adding new banner:", err);
            toast.error("Failed to add new banner.", {
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file); // Set the file for Firebase upload
        }
    };
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${BASE_URL}/banner`);
            console.log(res.data.data.banner);
            setSlide(res.data.data.banner);
        };
        getData();
    }, []);
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Banner Images</h2>

            {/* Display All Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {slide.map((item, index) => (
                    <div
                        key={item._id}
                        className="relative cursor-pointer"
                        onClick={() => handleEdit(index)}
                    >
                        <img
                            src={item.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                            Edit
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Image Button */}
            <div className="mt-6">
                <button
                    onClick={handleAddNew}
                    className="bg-custom-yellow text-black duration-300 hover:bg-black hover:text-white px-4 py-2 rounded mr-2"
                >
                    Add New Image
                </button>
            </div>

            {/* Editing/Adding Form */}
            {isEditing && (
                <div className="mt-6 p-4 border rounded shadow-lg bg-white max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-4">
                        {editIndex !== null ? "Edit Image" : "Add New Image"}
                    </h3>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Image</label>
                        {newImage && (
                            <img
                                src={newImage}
                                alt="Preview"
                                className="mb-2 w-full h-40 object-cover"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2"
                        />
                        {progress > 0 && <p>Upload progress: {progress}%</p>}
                        {error && (
                            <p className="text-red-500">
                                Error: {error.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">URL</label>
                        <input
                            type="text"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={
                                editIndex !== null
                                    ? handleSave
                                    : handleAddNewSave
                            }
                            className="bg-custom-yellow text-black duration-300 hover:bg-black hover:text-white px-4 py-2 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-black text-white duration-300 hover:bg-custom-yellow hover:text-black px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
