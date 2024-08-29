import React, { useState, useEffect } from "react";
import axios from "axios";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload"; // Import your custom Firebase hook
import { toast } from "react-toastify";

const Gallery = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [editingImageId, setEditingImageId] = useState(null);

    // Use the custom Firebase upload hook
    let { progress, error, downloadURL } = useFirebaseUpload(file);

    // Whenever there's a new download URL (meaning the upload finished), add or update the image in the gallery and make the appropriate request
    useEffect(() => {
        if (downloadURL) {
            const saveImageToGallery = async (imageUrl) => {
                try {
                    let response;

                    if (editingImageId && imageUrl) {
                        // Make a PUT request to your backend to update an existing image
                        response = await axios.put(
                            `${BASE_URL}/footer/${editingImageId}`,
                            { imageUrl }
                        );

                        const resData = response?.data?.response;

                        // Update the existing image in the state
                        setImages((prevImages) =>
                            prevImages.map((image) =>
                                image._id === editingImageId
                                    ? { ...image, image: imageUrl }
                                    : image
                            )
                        );
                        downloadURL = null;
                        toast.success(
                            "Image uploaded and added to gallery successfully!",
                            {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            }
                        );
                    } else if (!editingImageId && imageUrl) {
                        // Make a POST request to your backend to create a new image
                        response = await axios.post(`${BASE_URL}/footer`, {
                            imageUrl,
                        });
                        console.log(response.data.iiimage);
                        const newImage = response.data.iiimage;
                        setImages((prevImages) => [...prevImages, newImage]);
                        alert();
                        toast.success(
                            "Image uploaded and added to gallery successfully!",
                            {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            }
                        );
                    }

                    setEditingImageId(null); // Reset editing state
                } catch (err) {
                    console.error("Failed to save image to gallery:", err);

                    toast.error("Failed to save image to gallery.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } finally {
                    setEditingImageId(null);
                }
            };

            saveImageToGallery(downloadURL);
        }
    }, [downloadURL]);

    const handleImageChange = (e, imageId = null) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file); // Trigger Firebase upload
            setEditingImageId(imageId); // Set the image ID to determine if we are editing or adding new
        }
    };

    const handleCreateNew = () => {
        document.getElementById("fileInput-new").click();
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/footer`);
                console.log(response.data.images);
                setImages(response.data.images);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={handleCreateNew}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Create New
            </button>
            <input
                type="file"
                id="fileInput-new"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image?.image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer rounded-lg transition-transform duration-200 transform group-hover:scale-105"
                            onClick={() =>
                                document
                                    .getElementById(`fileInput-${index}`)
                                    .click()
                            }
                        />
                        <input
                            type="file"
                            id={`fileInput-${index}`}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleImageChange(e, image._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
