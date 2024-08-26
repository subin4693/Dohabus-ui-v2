import React, { useState } from "react";

const Banner = () => {
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

    const handleEdit = (index) => {
        setEditIndex(index);
        setIsEditing(true);
        setNewImage(slide[index].image);
        setNewUrl(slide[index].url);
    };

    const handleSave = () => {
        const updatedSlides = [...slide];
        updatedSlides[editIndex] = {
            ...updatedSlides[editIndex],
            image: newImage,
            url: newUrl,
        };
        setSlide(updatedSlides);
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleAddNew = () => {
        setIsEditing(true);
        setEditIndex(null); // Indicate that this is a new addition
        setNewImage("");
        setNewUrl("");
    };

    const handleAddNewSave = () => {
        const newSlide = {
            _id: Date.now().toString(),
            image: newImage,
            url: newUrl,
        };
        setSlide([...slide, newSlide]);
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
