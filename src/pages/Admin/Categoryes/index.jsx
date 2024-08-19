import React, { useState } from "react";

import { IoCameraOutline } from "react-icons/io5";
import Card from "./Card";

const CreateCategory = () => {
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const cardData = [
        {
            id: 1,
            title: "Beach Destinations",
            description: "Explore the best beaches around the world",
            imageUrl:
                "https://media.easemytrip.com/media/Blog/International/637597107367841576/637597107367841576IlmTQB.jpg",
        },
        {
            id: 2,
            title: "Beach Destinations",
            description: "Explore the best beaches around the world",
            imageUrl:
                "https://c.regencyholidays.com/blog/blog/content/images/2021/08/Places-To-Visit-In-Qatar.webp",
        },
        {
            id: 3,
            title: "Beach Destinations",
            description: "Explore the best beaches around the world",
            imageUrl:
                "https://c.regencyholidays.com/blog/blog/content/images/2021/08/Banana-Islands.webp",
        },
        {
            id: 4,
            title: "Beach Destinations",
            description: "Explore the best beaches around the world",
            imageUrl:
                "https://media.easemytrip.com/media/Blog/International/637597107367841576/637597107367841576IlmTQB.jpg",
        },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = () => {
        // Handle create or update logic here
        console.log("Creating/Updating category with data:", {
            title,
            description,
            image,
        });
        setIsOpen(false);
        // Reset form fields
        setTitle("");
        setDescription("");
        setImage(null);
        setSelectedData(null);
    };

    const handleDialog = (data = null) => {
        if (data) {
            // Edit mode
            setSelectedData(data);
            setTitle(data.title);
            setDescription(data.description);
            setImage(data.imageUrl);
        } else {
            // Create mode
            setSelectedData(null);
            setTitle("");
            setDescription("");
            setImage(null);
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full md:w-[800px] gap-4 p-5 border shadow-xl">
                        <div className="flex-1 flex items-center justify-center">
                            <label className="flex flex-col justify-center items-center cursor-pointer h-full">
                                {!image ? (
                                    <>
                                        <IoCameraOutline className="w-12 h-12 text-gray-500" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={image}
                                        alt="Selected"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </label>
                        </div>
                        <div className="flex-1 space-y-5 ">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full p-2 border border-black rounded-lg outline-none"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full h-[150px] p-2 border border-black rounded-lg outline-none resize-none"
                            />
                            <div className="flex gap-2">
                                <button
                                    // color={"red"}
                                    className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                                    onClick={() => handleDialog()}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                                    onClick={handleCreate}
                                >
                                    {selectedData ? "Update" : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-subtitle font-bold">Tour Category</h1>
                    <p className="text-small text-red">
                        Manage your tour categories
                    </p>
                </div>
                <div>
                    <button
                        className="px-5 bg-custom-yellow py-2 rounded-md duration-300 hover:bg-black hover:text-white"
                        onClick={() => handleDialog()}
                    >
                        Create Category
                    </button>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 flex-wrap">
                {cardData.map((card) => (
                    <Card
                        key={card.id}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        onClick={() => handleDialog(card)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CreateCategory;
