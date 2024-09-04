import React, { useEffect, useState } from "react";
import axios from "axios";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import { toast } from "react-toastify";
const TourPlanForm = ({ onClose }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [file, setFile] = useState(null);
    const [galleryFile, setGalleryFile] = useState(null);
    const [galleryVideoFile, setGalleryVideoFile] = useState(null);

    const [categoryOptions, setCategoryOptions] = useState([]);

    const [category, setCategory] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [title, setTitle] = useState({ en: "", ar: "" });
    const [duration, setDuration] = useState({ en: "", ar: "" });
    const [typeOfTour, setTypeOfTour] = useState({ en: "", ar: "" });
    const [transportation, setTransportation] = useState({ en: "", ar: "" });
    const [language, setLanguage] = useState({ en: "", ar: "" });
    const [description, setDescription] = useState({ en: "", ar: "" });
    const [highlights, setHighlights] = useState([{ en: "", ar: "" }]);
    const [includes, setIncludes] = useState([{ en: "", ar: "" }]);
    const [itinerary, setItinerary] = useState([{ en: "", ar: "" }]);
    const [knowBeforeYouGo, setKnowBeforeYouGo] = useState([
        { en: "", an: "" },
    ]);

    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);
    const [availableDays, setAvailableDays] = useState([]);
    const [adultPrice, setAdultPrice] = useState("");
    const [childPrice, setChildPrice] = useState("");
    const [selectedSessions, setSelectedSessions] = useState([]);
    const [isPickupRequired, setIsPickupRequired] = useState(false);
    const [isDropOffRequired, setIsDropOffRequired] = useState(false);

    const [faq, setFaq] = useState([
        { question: { en: "", ar: "" }, answer: { en: "", ar: "" } },
    ]);
    // Helper function to convert file to base64
    // const fileToBase64 = (file, cb) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => cb(null, reader.result);
    //     reader.onerror = (error) => cb(error, null);
    // };
    const {
        progress: progress,
        error: error,
        downloadURL: downloadURL,
    } = useFirebaseUpload(file);
    const {
        progress: progressGallery,
        error: errorGallery,
        downloadURL: downloadURLGallery,
    } = useFirebaseUpload(galleryFile);

    const {
        progress: progressVideo,
        error: errorVideo,
        downloadURL: downloadURLVideo,
    } = useFirebaseUpload(galleryVideoFile);

    const handleCoverImageChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the selected file
        if (selectedFile) {
            setFile(selectedFile); // Update the file state to trigger the upload
        }
    };

    const handleGalleryImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGalleryFile(file); // Set the file state to trigger upload
        }
    };

    const handleGalleryVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGalleryVideoFile(file); // Set the file state to trigger upload
        }
    };

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (setter, index) => (e) => {
        const { name, value } = e.target;
        setter((prev) => {
            const updatedArray = [...prev];
            updatedArray[index][name] = value;
            return updatedArray;
        });
    };

    const handleAddToArray = (setter) => () => {
        setter((prev) => [...prev, { en: "", ar: "" }]);
    };

    const handleRemoveFromArray = (setter, index) => () => {
        setter((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDaysChange = (event) => {
        const selectedDay = parseInt(event.target.value);

        setAvailableDays((prevDays) =>
            prevDays.includes(selectedDay)
                ? prevDays.filter((day) => day !== selectedDay)
                : [...prevDays, selectedDay],
        );
    };
    const handleChange = (index, field, value) => {
        const updatedItems = [...knowBeforeYouGo];
        updatedItems[index][field] = value;
        setKnowBeforeYouGo(updatedItems);
    };

    const addItem = () => {
        setKnowBeforeYouGo([...knowBeforeYouGo, { en: "", ar: "" }]);
    };

    const removeItem = (index) => {
        const updatedItems = knowBeforeYouGo.filter((_, i) => i !== index);
        setKnowBeforeYouGo(updatedItems);
    };

    const handleSessionChange = (event) => {
        const selectedSession = event.target.value;

        setSelectedSessions((prevSessions) =>
            prevSessions.includes(selectedSession)
                ? prevSessions.filter((session) => session !== selectedSession)
                : [...prevSessions, selectedSession],
        );
    };
    const handleChangefaq = (index, field, lang, value) => {
        console.log("working");
        const updatedFaq = [...faq];
        updatedFaq[index][field][lang] = value;
        setFaq(updatedFaq);
    };

    const addFaq = () => {
        setFaq([
            ...faq,
            { question: { en: "", ar: "" }, answer: { en: "", ar: "" } },
        ]);
    };

    const removeFaq = (index) => {
        const updatedFaq = faq.filter((_, i) => i !== index);
        setFaq(updatedFaq);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !category ||
            !coverImage ||
            !title ||
            !duration ||
            !typeOfTour ||
            !transportation ||
            !language ||
            !description ||
            !highlights ||
            !includes ||
            !itinerary ||
            !galleryImages ||
            !availableDays ||
            !adultPrice ||
            !childPrice ||
            !selectedSessions
        ) {
            toast.error("Please fill out all required fields.");
            return;
        }

        const formData = {
            category,
            coverImage,
            title,
            duration,
            typeOfTour,
            transportation,
            language,
            description,
            highlights,
            includes,
            itinerary,
            knowBeforeYouGo,
            galleryImages,
            galleryVideos,
            availableDays,
            adultPrice,
            childPrice,
            faq,
            selectedSessions,
            isPickupRequired,
            isDropOffRequired,
        };
        // console.log(formData);
        // return;
        try {
            const res = await axios.post(
                BASE_URL + "/plans",
                { formData },
                { withCredentials: true },
            );
            toast.success("  Plan created successfully...", {
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
            toast.error("Something went wrong! ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        } finally {
            // console.log("Form Data Submitted:", formData);
            onClose();
        }
    };
    useEffect(() => {
        if (downloadURL) {
            setCoverImage(downloadURL); // Set the cover image to the Firebase download URL
        }
    }, [downloadURL]);
    useEffect(() => {
        if (downloadURLGallery) {
            setGalleryImages((prev) => [...prev, downloadURLGallery]); // Add new URL to galleryImages
            setGalleryFile(null); // Clear file state after upload
        }
    }, [downloadURLGallery]);
    useEffect(() => {
        if (downloadURLVideo) {
            setGalleryVideos((prev) => [...prev, downloadURLVideo]); // Add new URL to galleryVideos
            setGalleryVideoFile(null); // Clear file state after upload
        }
    }, [downloadURLVideo]);
    useEffect(() => {
        const getCategorys = async () => {
            try {
                const { data } = await axios.get(BASE_URL + "/categorys");
                console.log(data);
                setCategoryOptions(data?.data?.categories);
            } catch (error) {
                console.log(error);
            }
        };

        getCategorys();
    }, []);
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-custom-yellow-light z-20">
            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white shadow-md rounded-md space-y-4 absolute h-[70vh] overflow-scroll max-w-[950px]"
            >
                {/* Category Dropdown */}
                <div>
                    <label htmlFor="category" className="block mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border rounded-md w-full"
                        required
                    >
                        <option value="">Select a category</option>
                        {categoryOptions?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.title.en} {/* Display the English title */}
                            </option>
                        ))}

                        {/* Add more categories as needed */}
                    </select>
                </div>
                {/* Cover Image Input */}
                <div>
                    <label htmlFor="coverImage" className="block mb-2">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        id="coverImage"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="p-2 border rounded-md w-full"
                    />
                    {coverImage && (
                        <img
                            src={coverImage}
                            alt="Cover Preview"
                            className="mt-2 w-32 h-32 object-cover"
                        />
                    )}
                    {progress > 0 && <p>Upload progress: {progress}%</p>}
                    {error && (
                        <p className="text-red-500">Error: {error.message}</p>
                    )}
                </div>
                {/* Text Inputs for Title, Duration, Type of Tour, Transportation, Language, Description */}
                {[
                    { label: "Title", state: title, setter: setTitle },
                    { label: "Duration", state: duration, setter: setDuration },
                    {
                        label: "Type of Tour",
                        state: typeOfTour,
                        setter: setTypeOfTour,
                    },
                    {
                        label: "Transportation",
                        state: transportation,
                        setter: setTransportation,
                    },
                    { label: "Language", state: language, setter: setLanguage },
                    {
                        label: "Description",
                        state: description,
                        setter: setDescription,
                    },
                ].map(({ label, state, setter }) => (
                    <div key={label}>
                        <label className="block mb-2">{label}</label>
                        <input
                            type="text"
                            placeholder={`English ${label}`}
                            value={state.en}
                            name="en"
                            onChange={handleInputChange(setter)}
                            className="p-2 border rounded-md mb-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder={`Arabic ${label}`}
                            value={state.ar}
                            name="ar"
                            onChange={handleInputChange(setter)}
                            className="p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                ))}
                {/* Highlights, Includes, Itinerary Array Inputs */}
                {[
                    {
                        label: "Highlights",
                        state: highlights,
                        setter: setHighlights,
                    },
                    { label: "Includes", state: includes, setter: setIncludes },
                    {
                        label: "Itinerary",
                        state: itinerary,
                        setter: setItinerary,
                    },
                ].map(({ label, state, setter }) => (
                    <div key={label}>
                        <label className="block mb-2">{label}</label>
                        {state.map((item, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder={`English ${label}`}
                                    value={item.en}
                                    name="en"
                                    onChange={handleArrayChange(setter, index)}
                                    className="p-2 border rounded-md w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder={`Arabic ${label}`}
                                    value={item.ar}
                                    name="ar"
                                    onChange={handleArrayChange(setter, index)}
                                    className="p-2 border rounded-md w-full"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveFromArray(
                                        setter,
                                        index,
                                    )}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddToArray(setter)}
                            className="bg-green-500 text-white py-1 px-2 rounded-md"
                        >
                            Add {label}
                        </button>
                    </div>
                ))}{" "}
                <label htmlFor="galleryImages" className="block mb-2">
                    Pickup and Dropoff
                </label>
                <div className="flex gap-10 items-center">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isPickupRequired}
                                onChange={(e) =>
                                    setIsPickupRequired(e.target.checked)
                                }
                            />{" "}
                            &nbsp;&nbsp; Is pickup location required
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isDropOffRequired}
                                onChange={(e) =>
                                    setIsDropOffRequired(e.target.checked)
                                }
                            />
                            &nbsp;&nbsp; Is drop off location required
                        </label>
                    </div>
                </div>
                {/* Gallery Images Input */}
                <div>
                    <label htmlFor="galleryImages" className="block mb-2">
                        Gallery Images
                    </label>
                    <input
                        type="file"
                        id="galleryImages"
                        accept="image/*"
                        onChange={handleGalleryImageChange}
                        className="p-2 border rounded-md w-full"
                    />
                    <div className="flex flex-wrap mt-2">
                        {galleryImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Gallery Preview ${index + 1}`}
                                className="w-20 h-20 object-cover mr-2 mb-2"
                            />
                        ))}
                    </div>
                    {progressGallery > 0 && (
                        <p>Upload progress: {progressGallery}%</p>
                    )}
                    {errorGallery && (
                        <p className="text-red-500">
                            Error: {errorGallery.message}
                        </p>
                    )}
                </div>
                {/* Gallery Videos Input */}
                <div>
                    <label htmlFor="galleryVideos" className="block mb-2">
                        Gallery Videos
                    </label>
                    <input
                        type="file"
                        id="galleryVideos"
                        accept="video/*"
                        onChange={handleGalleryVideoChange}
                        className="p-2 border rounded-md w-full"
                    />
                    <div className="flex flex-wrap mt-2">
                        {galleryVideos.map((video, index) => (
                            <video
                                key={index}
                                src={video}
                                controls
                                className="w-32 h-32 mr-2 mb-2"
                            />
                        ))}
                    </div>
                    {progressVideo > 0 && (
                        <p>Upload progress: {progressVideo}%</p>
                    )}
                    {errorVideo && (
                        <p className="text-red-500">
                            Error: {errorVideo.message}
                        </p>
                    )}
                </div>
                {/* Available Days Dropdown */}
                <div>
                    <label htmlFor="availableDays" className="block mb-2">
                        Available Days
                    </label>
                    <div className="flex flex-wrap">
                        {[
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                        ].map((day, index) => (
                            <div
                                key={day}
                                className="flex items-center mr-4 mb-2"
                            >
                                <input
                                    type="checkbox"
                                    id={`day-${index}`}
                                    value={index}
                                    checked={availableDays.includes(index)}
                                    onChange={handleDaysChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`day-${index}`}>{day}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2">
                        Selected Days:{" "}
                        {availableDays
                            .map(
                                (day) =>
                                    [
                                        "Sunday",
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                    ][day],
                            )
                            .join(", ")}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="mt-4">
                        <label htmlFor="sessions" className="block mb-2">
                            Select Sessions
                        </label>
                        <div className="flex flex-wrap">
                            {Array.from({ length: 24 }, (_, index) => {
                                const sessionTime =
                                    index === 0
                                        ? "12 AM"
                                        : index < 12
                                          ? `${index} AM`
                                          : index === 12
                                            ? `12 PM`
                                            : `${index - 12} PM`;

                                return (
                                    <React.Fragment key={sessionTime}>
                                        {index === 12 && (
                                            <div className="w-full"></div>
                                        )}{" "}
                                        {/* Line break after 12 items */}
                                        <div className="flex items-center mr-4 mb-2">
                                            <input
                                                type="checkbox"
                                                id={`session-${sessionTime}`}
                                                value={sessionTime}
                                                checked={selectedSessions.includes(
                                                    sessionTime,
                                                )}
                                                onChange={handleSessionChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`session-${sessionTime}`}
                                            >
                                                {sessionTime}
                                            </label>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-2">
                        Selected Sessions: {selectedSessions.join(", ")}
                    </div>
                </div>
                {/* Price Inputs */}
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="adultPrice" className="block mb-2">
                            Adult Price
                        </label>
                        <input
                            type="number"
                            id="adultPrice"
                            value={adultPrice}
                            onChange={(e) => setAdultPrice(e.target.value)}
                            className="p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="childPrice" className="block mb-2">
                            Child Price
                        </label>
                        <input
                            type="number"
                            id="childPrice"
                            value={childPrice}
                            onChange={(e) => setChildPrice(e.target.value)}
                            className="p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                </div>{" "}
                <div className="mt-4">
                    <label htmlFor="knowBeforeYouGo" className="block mb-2">
                        Know Before You Go
                    </label>
                    {knowBeforeYouGo.map((item, index) => (
                        <div key={index} className="flex flex- w-full  mb-2">
                            <div className="flex   w-full gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="English"
                                    value={item.en}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "en",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Arabic"
                                    value={item.ar}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "ar",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="text-red-500 ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                    >
                        Add Item
                    </button>
                </div>
                {/* Submit Button */}
                <div className="mt-4">
                    <label htmlFor="faq" className="block mb-2">
                        FAQs
                    </label>
                    {faq.map((faqItem, index) => (
                        <div
                            key={index}
                            className="flex flex-col mb-4 p-2 border rounded-md"
                        >
                            <div className="mb-2">
                                <label className="block mb-1">Question</label>
                                <input
                                    type="text"
                                    placeholder="English"
                                    value={faqItem.question.en}
                                    onChange={(e) =>
                                        handleChangefaq(
                                            index,
                                            "question",
                                            "en",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Arabic"
                                    value={faqItem.question.ar}
                                    onChange={(e) =>
                                        handleChangefaq(
                                            index,
                                            "question",
                                            "ar",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">Answer</label>
                                <input
                                    type="text"
                                    placeholder="English"
                                    value={faqItem.answer.en}
                                    onChange={(e) =>
                                        handleChangefaq(
                                            index,
                                            "answer",
                                            "en",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Arabic"
                                    value={faqItem.answer.ar}
                                    onChange={(e) =>
                                        handleChangefaq(
                                            index,
                                            "answer",
                                            "ar",
                                            e.target.value,
                                        )
                                    }
                                    className="p-2 border rounded-md w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="text-red-500"
                            >
                                Remove FAQ
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFaq}
                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                    >
                        Add FAQ
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Submit
                </button>
                &nbsp;
                <button
                    type="submit"
                    onClick={onClose}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default TourPlanForm;
