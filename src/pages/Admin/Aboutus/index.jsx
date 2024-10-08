import React, { useState, useEffect } from "react";
import LocalizedInput from "./LocalizedInput";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import { toast } from "react-toastify";
import axios from "axios";

import { useSelector } from "react-redux";

const AboutUsForm = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const mainUser = useSelector((state) => state.user.user);
    const [initialData, setInitialData] = useState(false);
    const [formData, setFormData] = useState({
        image: "",
        about: { en: "", ar: "" },
        mission: { en: "", ar: "" },
        vision: { en: "", ar: "" },
    });

    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        const lang = dataset.lang;

        if (lang) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: {
                    ...prevData[name],
                    [lang]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file); // Set the file state to trigger Firebase upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (initialData) {
            try {
                // Post request to the backend endpoint with formData

                const response = await axios.put(
                    `${BASE_URL}/about/` + formData._id,
                    formData
                );

                toast.success("Successfully updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Error submitting form data:", error);

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
        } else {
            e.preventDefault();
            try {
                // Post request to the backend endpoint with formData

                const response = await axios.post(
                    `${BASE_URL}/about/`,
                    formData
                );

                toast.success("Successfully updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Error submitting form data:", error);
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
        }
    };

    const { progress, error, downloadURL } = useFirebaseUpload(file);

    useEffect(() => {
        if (downloadURL) {
            setFormData((prevData) => ({
                ...prevData,
                image: downloadURL, // Update formData with the Firebase download URL
            }));
        }
    }, [downloadURL]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/about`, formData);

                let dataa = response.data.aboutus[0];

                dataa.about = dataa.text;
                setFormData(dataa);

                setInitialData(true);
            } catch (error) {
                console.log(error);

                setInitialData(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">
                {initialData ? "Edit About Us" : "Create About Us"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Image</label>
                    <label className="min-w-lg h-[250px] bg-gray-200 w-full flex items-center justify-center cursor-pointer">
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Selected"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span>Select an image</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange} // Handle file selection
                            disabled={mainUser.role !== "super-admin"}
                        />
                    </label>

                    {/* Optionally display upload progress and errors */}
                    {progress > 0 && <p>Upload Progress: {progress}%</p>}
                    {error && <p>Error: {error}</p>}
                </div>

                <LocalizedInput
                    label="about"
                    value={formData.about.en}
                    onChange={handleChange}
                    lang="en"
                    placeholder="Enter About Us text in English"
                    disabled={mainUser.role !== "super-admin"}
                />
                <LocalizedInput
                    label="about"
                    value={formData.about.ar}
                    onChange={handleChange}
                    lang="ar"
                    placeholder="Enter About Us text in Arabic"
                    disabled={mainUser.role !== "super-admin"}
                />
                <LocalizedInput
                    label="mission"
                    value={formData.mission.en}
                    onChange={handleChange}
                    lang="en"
                    placeholder="Enter Mission text in English"
                    disabled={mainUser.role !== "super-admin"}
                />
                <LocalizedInput
                    label="mission"
                    value={formData.mission.ar}
                    onChange={handleChange}
                    lang="ar"
                    placeholder="Enter Mission text in Arabic"
                    disabled={mainUser.role !== "super-admin"}
                />
                <LocalizedInput
                    label="vision"
                    value={formData.vision.en}
                    onChange={handleChange}
                    lang="en"
                    placeholder="Enter Vision text in English"
                    disabled={mainUser.role !== "super-admin"}
                />
                <LocalizedInput
                    label="vision"
                    value={formData.vision.ar}
                    onChange={handleChange}
                    lang="ar"
                    placeholder="Enter Vision text in Arabic"
                    disabled={mainUser.role !== "super-admin"}
                />

                {mainUser && mainUser.role === "super-admin" && (
                    <button
                        type="submit"
                        className="bg-custom-yellow text-black duration-300 hover:text-white px-4 py-2 mt-4 rounded hover:bg-black"
                    >
                        {initialData ? "Update About Us" : "Create About Us"}
                    </button>
                )}
            </form>
        </div>
    );
};

export default AboutUsForm;
