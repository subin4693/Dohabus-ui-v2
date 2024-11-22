import React, { useEffect, useState } from "react";
import axios from "axios";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import { toast } from "react-toastify";
import { TextField, Box, Button, Chip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import PricingComponent from "./PricingComponent";
import AddonComponent from "./AddonComponent";
import SinglePriceComponent from "./SinglePriceComponent";
import Loader from "../../../components/Loader";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import PriceLimiting from "./PriceLimiting";

const TourPlanForm = ({ onClose }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [file, setFile] = useState(null);
  const [galleryFile, setGalleryFile] = useState(null);
  const [tempGallery, setTempGallery] = useState(null);
  const [galleryVideoFile, setGalleryVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [adultData, setAdultData] = useState([
    { pax: null, price: null }, // Default values should be null or a distinct value to indicate no user input yet
  ]);
  const [childData, setChildData] = useState([
    { pax: null, price: null }, // Default values should be null or a distinct value to indicate no user input yet
  ]);
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [duration, setDuration] = useState({ en: "", ar: "" });
  const [typeOfTour, setTypeOfTour] = useState({ en: "", ar: "" });
  const [transportation, setTransportation] = useState({ en: "", ar: "" });
  const [language, setLanguage] = useState({ en: "", ar: "" });
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [highlights, setHighlights] = useState([{ en: "", ar: "" }]);
  const [addon, setAddon] = useState([{ en: "", ar: "", price: "" }]);
  const [includes, setIncludes] = useState([{ en: "", ar: "" }]);
  const [itinerary, setItinerary] = useState([{ en: "", ar: "" }]);
  const [knowBeforeYouGo, setKnowBeforeYouGo] = useState([{ en: "", an: "" }]);

  const [minPerson, setMinPerson] = useState(0);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [adultPrice, setAdultPrice] = useState("");
  const [childPrice, setChildPrice] = useState("");
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [isPickupRequired, setIsPickupRequired] = useState(false);
  const [isDropOffRequired, setIsDropOffRequired] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [faq, setFaq] = useState([
    { question: { en: "", ar: "" }, answer: { en: "", ar: "" } },
  ]);
  const [stopSales, setStopSales] = useState([]);
  const [limit, setLimit] = useState(0);
  // Helper function to convert file to base64
  // const fileToBase64 = (file, cb) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => cb(null, reader.result);
  //     reader.onerror = (error) => cb(error, null);
  // };
  const [activeIndex, setActiveIndex] = useState(0);
  const [pricingLimits, setPricingLimits] = useState([]);

  const [selectedTime, setSelectedTime] = useState(null); // To store current time selection
  const [selectedCloseTime, setSelectedCloseTime] = useState(null);

  // Handle when time is selected from the picker
  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };
  const handleCloseTimeChange = (newTime) => {
    setSelectedCloseTime(newTime);
  };

  // Add the selected time to the list and format it to "h:mm A" format
  const handleAddSession = () => {
    if (selectedTime && selectedCloseTime) {
      const formattedTime = dayjs(selectedTime).format("h:mm A");
      const formattedCloseTime = dayjs(selectedCloseTime).format("h:mm A");

      // Check if the session with the same name already exists
      const sessionExists = selectedSessions.some(
        (session) => session.name === formattedTime
      );

      if (!sessionExists) {
        setSelectedSessions([
          ...selectedSessions,
          { name: formattedTime, closeTime: formattedCloseTime },
        ]);
      }
    }
  };
  console.log("Sessionnnnnnnnnnnnnnnnnnnnn", selectedSessions);

  // Remove a selected session from the array
  const handleRemoveSession = (session) => {
    setSelectedSessions(
      selectedSessions.filter((selected) => selected !== session)
    );
  };

  const {
    progress: progress,
    error: error,
    downloadURL: downloadURL,
  } = useFirebaseUpload(file);
  // const {
  //     progress: progressGallery,
  //     error: errorGallery,
  //     downloadURL: downloadURLGallery,
  // } = useFirebaseUpload(galleryFile);

  // const {
  //     progress: progressVideo,
  //     error: errorVideo,
  //     downloadURL: downloadURLVideo,
  // } = useFirebaseUpload(galleryVideoFile);

  const handleCoverImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFile(selectedFile); // Update the file state to trigger the upload
    }
  };
  const handleGalleryImageChange = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    if (files.length > 0) {
      setLoading(true);
      console.log("setting set loading true");
      setGalleryFile(files[0]);

      await uploadFilesSequentially(files, setGalleryImages); // Call function to handle sequential upload
      console.log("setting set loading false");

      setLoading(false);
    }
  };

  const handleGalleryVideoChange = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    if (files.length > 0) {
      setLoading(true);
      console.log("setting set loading true");

      setGalleryVideoFile(files[0]);

      await uploadFilesSequentially(files, setGalleryVideos); // Call function to handle sequential upload
      console.log("setting set loading false");

      setLoading(false);
    }
  };

  const uploadFilesSequentially = async (files, setter) => {
    for (let i = 0; i < files.length; i++) {
      let uploadedlink = await uploadSingleFile(files[i]);
      setter((prev) => [...prev, uploadedlink]);
    }
  };
  const uploadSingleFile = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error); // Handle error
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

            resolve(downloadUrl); // Resolve when upload is complete
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error); // Handle error
          }
        }
      );
    });
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
        : [...prevDays, selectedDay]
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
        : [...prevSessions, selectedSession]
    );
  };
  const handleChangefaq = (index, field, lang, value) => {
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
    setLoading(true);
    e.preventDefault();
    const formattedDates = stopSales.map((date) =>
      date instanceof DateObject ? date.toDate().toISOString() : date
    );

    // Utility function to remove empty fields from an object
    const removeEmptyFields = (obj) => {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        if (
          obj[key] &&
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key])
        ) {
          // Recursively clean nested objects
          const cleanedSubObj = removeEmptyFields(obj[key]);
          if (Object.keys(cleanedSubObj).length > 0) {
            newObj[key] = cleanedSubObj;
          }
        } else if (typeof obj[key] === "string" && obj[key].trim() !== "") {
          // Only trim if the value is a string
          newObj[key] = obj[key].trim();
        } else if (
          typeof obj[key] !== "string" &&
          obj[key] !== null &&
          obj[key] !== undefined
        ) {
          // Keep non-string values like numbers or booleans
          newObj[key] = obj[key];
        }
      });
      return newObj;
    };

    // Required field checks
    if (
      !category ||
      !coverImage ||
      !title.en ||
      !title.ar ||
      !description.en ||
      !description.ar ||
      availableDays.length === 0
    ) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    // if (pricingByMonth && pricingByMonth.length > 0) {
    //   for (const monthPricing of pricingByMonth) {
    //     const hasMonthAdultPrice =
    //       monthPricing.adultPrice !== undefined &&
    //       monthPricing.adultPrice !== null;
    //     const hasMonthChildPrice =
    //       monthPricing.childPrice !== undefined &&
    //       monthPricing.childPrice !== null;
    //     const hasMonthAdultData =
    //       monthPricing.adultData &&
    //       monthPricing.adultData.some(
    //         (row) => Number(row.pax) > 0 || Number(row.price) > 0
    //       );
    //     const hasMonthChildData =
    //       monthPricing.childData &&
    //       monthPricing.childData.some(
    //         (row) => Number(row.pax) > 0 || Number(row.price) > 0
    //       );

    //     // Check if both price and detailed data are filled for the same month
    //     if (
    //       (hasMonthAdultPrice || hasMonthChildPrice) &&
    //       (hasMonthAdultData || hasMonthChildData)
    //     ) {
    //       setLoading(false);
    //       return toast.error(
    //         `For month ${
    //           monthPricing.month + 1
    //         }, provide either single price fields (adultPrice/childPrice) or detailed pricing data (adultData/childData), not both.`
    //       );
    //     }

    //     // Check if both adultPrice and childPrice are provided together
    //     if (
    //       (hasMonthAdultPrice && !hasMonthChildPrice) ||
    //       (!hasMonthAdultPrice && hasMonthChildPrice)
    //     ) {
    //       setLoading(false);
    //       return toast.error(
    //         `For month ${
    //           monthPricing.month + 1
    //         }, both adultPrice and childPrice must be provided together.`
    //       );
    //     }

    //     // Check if both adultData and childData are provided together
    //     if (
    //       (hasMonthAdultData && !hasMonthChildData) ||
    //       (!hasMonthAdultData && hasMonthChildData)
    //     ) {
    //       setLoading(false);
    //       return toast.error(
    //         `For month ${
    //           monthPricing.month + 1
    //         }, both adultData and childData must be provided together.`
    //       );
    //     }

    //     // New condition: Ensure all months have either adultPrice/childPrice or adultData/childData
    //     const hasCompletePriceForMonth =
    //       (hasMonthAdultPrice && hasMonthChildPrice) ||
    //       (hasMonthAdultData && hasMonthChildData);

    //     if (!hasCompletePriceForMonth) {
    //       setLoading(false);
    //       return toast.error(
    //         `For month ${
    //           monthPricing.month + 1
    //         }, you must provide either both adultPrice and childPrice or both adultData and childData.`
    //       );
    //     }
    //   }

    //   // If all checks pass
    //   setLoading(true);
    //   // Proceed with form submission or other logic here...
    // } else {
    //   setLoading(false);
    //   return toast.error("Enter valid price for all months");
    // }
    let formData = {
      category,
      coverImage,
      title: removeEmptyFields(title),
      duration: removeEmptyFields(duration),
      typeOfTour: removeEmptyFields(typeOfTour),
      transportation: removeEmptyFields(transportation),
      language: removeEmptyFields(language),
      description: removeEmptyFields(description),
      highlights: highlights.filter((item) => item.en || item.ar),
      includes: includes.filter((item) => item.en || item.ar),
      itinerary: itinerary.filter((item) => item.en || item.ar),
      knowBeforeYouGo: knowBeforeYouGo.filter((item) => item.en || item.an),
      galleryImages: galleryImages.filter((item) => item), // Filter non-empty images
      galleryVideos: galleryVideos.filter((item) => item), // Filter non-empty videos
      availableDays,
      faq: faq.filter(
        (item) =>
          item.question.en ||
          item.question.ar ||
          item.answer.en ||
          item.answer.ar
      ),
      selectedSessions,
      isPickupRequired,
      isDropOffRequired,
      addOn: addon.filter((item) => item.en || item.ar || item.price),
      limit,
      stopSales: formattedDates,
      minPerson,
      pricingLimits,
      adultData,
      childData,
      adultPrice,
      childPrice,
    };

    // Remove any empty keys (fields that are empty objects or arrays)
    formData = removeEmptyFields(formData);

    console.log(formData);

    try {
      const res = await axios.post(`${BASE_URL}/plans`, formData);
      setLoading(false);
      toast.success("Plan created successfully...", {
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
      setLoading(false);

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (downloadURL) {
      setCoverImage(downloadURL); // Set the cover image to the Firebase download URL
    }
  }, [downloadURL]);
  // useEffect(() => {
  //     if (downloadURLGallery) {
  //         setGalleryImages((prev) => [...prev, downloadURLGallery]); // Add new URL to galleryImages
  //         setGalleryFile(null); // Clear file state after upload
  //     }
  // }, [downloadURLGallery]);
  // useEffect(() => {
  //     if (downloadURLVideo) {
  //         setGalleryVideos((prev) => [...prev, downloadURLVideo]); // Add new URL to galleryVideos
  //         setGalleryVideoFile(null); // Clear file state after upload
  //     }
  // }, [downloadURLVideo]);
  useEffect(() => {
    const getCategorys = async () => {
      try {
        const { data } = await axios.get(BASE_URL + "/categorys");
        setCategoryOptions(data?.data?.categories);
      } catch (error) {
        console.log(error);
      }
    };

    getCategorys();
  }, []);

  const handleImageDelete = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleVideoDelete = (index) => {
    setGalleryVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-custom-yellow-light z-20">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-md space-y-4 absolute h-[70vh] overflow-scroll max-w-[950px]"
      >
        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block mb-2 font-bold">
            Category{" "}
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md w-full"
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
          <label htmlFor="coverImage" className="block mb-2 font-bold">
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
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
        {/* Text Inputs for Title, Duration, Type of Tour, Transportation, Language, Description */}
        {[
          {
            label: "Title",
            state: title,
            setter: setTitle,
            optional: false,
          },
          {
            label: "Duration",
            state: duration,
            setter: setDuration,
            optional: true,
          },
          {
            label: "Type of Tour",
            state: typeOfTour,
            setter: setTypeOfTour,
            optional: true,
          },
          {
            label: "Transportation",
            state: transportation,
            setter: setTransportation,
            optional: true,
          },
          {
            label: "Language",
            state: language,
            setter: setLanguage,
            optional: true,
          },
          {
            label: "Description",
            state: description,
            setter: setDescription,
            optional: false,
          },
        ].map(({ label, state, setter, optional }) => (
          <div key={label}>
            <label className="block mb-2 font-bold">
              {label}{" "}
              {optional && (
                <span className="text-gray-600 ml-2">(optional)</span>
              )}
            </label>
            <input
              type="text"
              placeholder={`English ${label}`}
              value={state.en}
              name="en"
              onChange={handleInputChange(setter)}
              className="p-2 border rounded-md mb-2 w-full"
            />
            <input
              type="text"
              placeholder={`Arabic ${label}`}
              value={state.ar}
              name="ar"
              onChange={handleInputChange(setter)}
              className="p-2 border rounded-md w-full"
              dir="rtl"
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
            <label className="block mb-2 font-bold">
              {label} <span className="text-gray-600 ml-2">(optional)</span>
            </label>
            {state.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`English ${label}`}
                  value={item.en}
                  name="en"
                  onChange={handleArrayChange(setter, index)}
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder={`Arabic ${label}`}
                  value={item.ar}
                  name="ar"
                  onChange={handleArrayChange(setter, index)}
                  className="p-2 border rounded-md w-full"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={handleRemoveFromArray(setter, index)}
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
        <div>
          <AddonComponent label="Addon" state={addon} setter={setAddon} />
        </div>
        <label htmlFor="galleryImages" className="block mb-2 ">
          <span className="font-bold">Pickup and Dropoff </span>
          <span className="text-gray-600 ml-2">(optional)</span>
        </label>
        <div className="flex gap-10 items-center">
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPickupRequired}
                onChange={(e) => setIsPickupRequired(e.target.checked)}
              />{" "}
              &nbsp;&nbsp; Is pickup location required
            </label>
          </div>
          {/* <div>
            <label>
              <input
                type="checkbox"
                checked={isDropOffRequired}
                onChange={(e) => setIsDropOffRequired(e.target.checked)}
              />
              &nbsp;&nbsp; Is drop off location required
            </label>
          </div> */}
        </div>
        {/* Gallery Images Input */}
        <div>
          <label htmlFor="galleryImages" className="block mb-2 font-bold">
            Gallery Images{" "}
            <span className="text-gray-600 ml-2">(optional)</span>
          </label>
          <input
            type="file"
            id="galleryImages"
            accept="image/*"
            onChange={handleGalleryImageChange}
            className="p-2 border rounded-md w-full"
            multiple
          />
          <div className="flex flex-wrap mt-2">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery Preview ${index + 1}`}
                className="w-20 h-20 object-cover mr-2 mb-2 cursor-pointer"
                onClick={() => handleImageDelete(index)}
              />
            ))}
          </div>
        </div>
        {/* Gallery Videos Input */}
        <div>
          <label htmlFor="galleryVideos" className="block mb-2 font-bold">
            Gallery Videos{" "}
            <span className="text-gray-600 ml-2">(optional)</span>
          </label>
          <input
            type="file"
            id="galleryVideos"
            accept="video/*"
            onChange={handleGalleryVideoChange}
            className="p-2 border rounded-md w-full"
            multiple
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {galleryVideos.map((video, index) => (
              <div className="flex w-32 flex-wrap justify-center items-center">
                <div className="">
                  <video
                    key={index}
                    src={video}
                    controls
                    className="w-32 h-32 mr-2 mb-2 cursor-pointer"
                  />
                </div>

                <button
                  className="bg-red-500 text-white p-1 w-full"
                  onClick={() => handleVideoDelete(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Available Days Dropdown */}
        <div>
          <label htmlFor="availableDays" className="block mb-2 font-bold">
            Available Days{" "}
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
              <div key={day} className="flex items-center mr-4 mb-2">
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
          {availableDays.length == 0 ? (
            <p>No dates selected</p>
          ) : (
            <>
              {" "}
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
                      ][day]
                  )
                  .join(", ")}
              </div>
            </>
          )}
        </div>{" "}
        <div>
          {/* ******************************************************************************************************************* */}
          <div>
            <label className="font-bold">Stop sales</label>{" "}
            <span className="text-gray-600 ml-2">(optional)</span>
          </div>

          <div>
            <DatePicker
              multiple
              value={stopSales}
              className="text-xl"
              format="MMMM DD YYYY"
              sort
              onChange={setStopSales}
              plugins={[<DatePanel />]}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <h3>
                  <span className="font-bold"> Select Sessions </span>
                  <span className="text-gray-600 ml-2">(optional)</span>
                </h3>

                <div className="flex items-center gap-5 flex-wrap  mt-4">
                  <TimePicker
                    label="Select Time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={true} // Ensure AM/PM format
                  />
                  <TimePicker
                    label="Select Close Time"
                    value={selectedCloseTime}
                    onChange={handleCloseTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={true} // Ensure AM/PM format
                  />

                  {/* Button to add the selected time to sessions */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSession}
                  >
                    Add Session
                  </Button>
                </div>

                {/* Display the list of selected sessions */}
                <Box mt={2}>
                  <h4>Selected Sessions</h4>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedSessions.length === 0 ? (
                      <p>No sessions selected</p>
                    ) : (
                      selectedSessions.map((session, index) => (
                        <Chip
                          key={index}
                          label={`${session?.name} (Close: ${session?.closeTime})`} // Show name and close time
                          onDelete={() => handleRemoveSession(session)}
                          color="primary"
                        />
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            </LocalizationProvider>
          </div>
        </div>
        {/* Price Inputs */}
        <div>
          {/* Toggle Switch */}
          <div className="mb-4">
            <label className="inline-flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="sr-only"
                checked={showPricing}
                onChange={() => setShowPricing(!showPricing)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
              <div
                className={`${
                  showPricing ? "translate-x-5" : "translate-x-0"
                } absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform`}
              ></div>
              <span className="ml-3 text-gray-700">
                {showPricing ? "Dynamic Pricing" : "Single Pricing"}
              </span>
            </label>
          </div>

          {/* Conditional Rendering */}
          {showPricing ? (
            <PricingComponent
              adultData={adultData}
              setAdultData={setAdultData}
              childData={childData}
              setChildData={setChildData}
            />
          ) : (
            <SinglePriceComponent
              adultPrice={adultPrice}
              setAdultPrice={setAdultPrice}
              childPrice={childPrice}
              setChildPrice={setChildPrice}
            />
          )}
        </div>
        <PriceLimiting
          pricingLimits={pricingLimits}
          setPricingLimits={setPricingLimits}
        />
        <div className="mt-4">
          <label htmlFor="minpers" className="block mb-2 font-bold">
            Minimum person count
            <span className="text-gray-600 ml-2">(optional)</span>
          </label>
          <input
            type="number"
            id="minpers"
            value={minPerson}
            min="0"
            onChange={(e) => setMinPerson(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="limit" className="block mb-2 font-bold">
            Set ticket limit
            <span className="text-gray-600 ml-2">(optional)</span>
          </label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            min="0"
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="knowBeforeYouGo" className="block mb-2">
            <span className="font-bold">Know Before You Go </span>
            <span className="text-gray-600 ml-2">(optional)</span>
          </label>
          {knowBeforeYouGo.map((item, index) => (
            <div key={index} className="flex flex- w-full  mb-2">
              <div className="flex   w-full gap-2 mb-2">
                <input
                  type="text"
                  placeholder="English"
                  value={item.en}
                  onChange={(e) => handleChange(index, "en", e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="Arabic"
                  value={item.ar}
                  onChange={(e) => handleChange(index, "ar", e.target.value)}
                  className="p-2 border rounded-md w-full"
                  dir="rtl"
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
            <span className="font-bold"> FAQs </span>
            <span className="text-gray-600 ml-2">(optional)</span>
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
                    handleChangefaq(index, "question", "en", e.target.value)
                  }
                  className="p-2 border rounded-md w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Arabic"
                  value={faqItem.question.ar}
                  onChange={(e) =>
                    handleChangefaq(index, "question", "ar", e.target.value)
                  }
                  dir="rtl"
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
                    handleChangefaq(index, "answer", "en", e.target.value)
                  }
                  className="p-2 border rounded-md w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Arabic"
                  value={faqItem.answer.ar}
                  onChange={(e) =>
                    handleChangefaq(index, "answer", "ar", e.target.value)
                  }
                  dir="rtl"
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
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          {loading ? (
            <div className="">
              <Loader />
            </div>
          ) : (
            <div className="">Submit</div>
          )}
        </button>
        &nbsp;
        <button
          type="submit"
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default TourPlanForm;
