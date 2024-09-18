import React, { useState, useEffect } from "react";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import Card from "./Card";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

const CreateCategory = () => {
  const mainUser = useSelector((state) => state.user.user);
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [image, setImage] = useState(null);
  const lang = useSelector((state) => state.language.lang);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [location, setLocation] = useState({ en: "", ar: "" });
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [stops, setStops] = useState([{ en: "", ar: "" }]);
  const [operatorName, setOperatorName] = useState(""); // Operator name state
  const [cruiseName, setCruiseName] = useState(""); // Cruise name state
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Set the file state to trigger Firebase upload
    }
  };
  const handleStopChange = (e, index, lang) => {
    const { value } = e.target;
    const updatedStops = stops.map((stop, i) =>
      i === index ? { ...stop, [lang]: value } : stop
    );
    setStops(updatedStops);
  };

  // Add Stop Function
  const addStop = () => {
    setStops([...stops, { en: "", ar: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input
    setLocation((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the state based on the input's name
    }));
  };

  const handleCreate = async (isEdit) => {
    setLoading(true);
    if (mainUser.role !== "super-admin") return;
    try {
      let updatedCategory;
      console.log(updatedCategory);

      if (isEdit) {
        // Edit an existing category
        const res = await axios.put(`${BASE_URL}/couries/${selectedData._id}`, {
          title,
          coverImage: image,
          operatorName,
          cruiseName,
          location,
          numberOfNights,
          stops,
        });
        console.log(res.data.data);

        updatedCategory = res.data.data.courise;

        console.log(updatedCategory);

        // Update the category in the state
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === updatedCategory?._id ? updatedCategory : category
          )
        );
        setIsOpen(false);

        setLoading(false);
        return toast.success("New courise created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        // Create a new category
        const res = await axios.post(`${BASE_URL}/couries`, {
          title,
          coverImage: image,
          operatorName,
          cruiseName,
          location,
          numberOfNights,
          stops,
        });
        updatedCategory = res.data.data.courise;
        console.log(updatedCategory);

        // Add the new category to the end of the state array
        setCategories((prevCategories) => [...prevCategories, updatedCategory]);
      }

      // Log the creation/update
      console.log("Creating/Updating category with data:", {
        title,
        description,
        image,
      });

      // Close the modal or form
      setIsOpen(false);

      // Reset form fields
      setTitle({ en: "", ar: "" });
      setDescription({ en: "", ar: "" });
      setImage(null);
      setSelectedData(null);
      toast.success("Hotel details updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error(error);

      toast.error("Some error occurred", {
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

  const handleDialog = (data = null) => {
    if (mainUser.role !== "super-admin") return;
    if (data) {
      // Edit mode
      console.log(data);
      setSelectedData(data);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.coverImage);
    } else {
      // Create mode
      setSelectedData(null);
      setTitle({ en: "", ar: "" });
      setDescription({ en: "", ar: "" });
      setImage(null);
    }
    setIsOpen((prev) => !prev);
  };
  const { progress, error, downloadURL } = useFirebaseUpload(file);
  useEffect(() => {
    if (downloadURL) {
      setImage(downloadURL); // Update formData with the Firebase download URL
    }
  }, [downloadURL]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/couries");
        console.log(res.data.data.courise);
        setCategories(res.data.data.cruises);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleRemove = async (id) => {
    try {
      if (id) {
        // Make delete request to the server
        const res = await axios.delete(`${BASE_URL}/couries/${id}`);

        // Show success message
        toast.success("Cruise deleted successfully!", { theme: "dark" });

        // Update the state to remove the deleted cruise from the UI
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      }
    } catch (error) {
      // Show error message
      toast.error("Failed to delete Cruise.", { theme: "dark" });
      console.error(error);
    }
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
                      id="coverImage"
                      accept="image/*"
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
                {progress > 0 && progress !== 100 && (
                  <p>Upload progress: {progress}%</p>
                )}
                {error && (
                  <p className="text-red-500">Error: {error.message}</p>
                )}
              </label>
            </div>

            <div className="flex-1 space-y-5">
              {/* Title in English */}
              <input
                type="text"
                value={title.en}
                onChange={(e) =>
                  setTitle((prev) => ({
                    ...prev,
                    en: e.target.value,
                  }))
                }
                placeholder="Title (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Title in Arabic */}
              <input
                dir="rtl"
                type="text"
                value={title.ar}
                onChange={(e) =>
                  setTitle((prev) => ({
                    ...prev,
                    ar: e.target.value,
                  }))
                }
                placeholder="العنوان (بالعربية)" // Arabic for 'Title'
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              <input
                type="text"
                value={operatorName.en}
                onChange={(e) => setOperatorName((prev) => e.target.value)}
                placeholder="Operator Name (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              <input
                type="text"
                value={cruiseName.en}
                onChange={(e) => setCruiseName((prev) => e.target.value)}
                placeholder="Cruise Name (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Location in English */}
              <input
                type="text"
                value={location.en}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    en: e.target.value, // Correctly updating 'en'
                  }))
                }
                placeholder="Location (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Location in Arabic */}
              <input
                dir="rtl"
                type="text"
                value={location.ar}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    ar: e.target.value, // Correctly updating 'ar'
                  }))
                }
                placeholder="الموقع (بالعربية)" // Arabic for 'Location'
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Number of Nights */}
              <input
                type="number"
                value={numberOfNights}
                onChange={(e) => setNumberOfNights(e.target.value)}
                placeholder="Number of Nights"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Stops in English */}
              {stops.map((stop, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={stop.en}
                    onChange={(e) => handleStopChange(e, index, "en")}
                    placeholder={`Stop ${index + 1} (English)`}
                    className="w-full p-2 border border-black rounded-lg outline-none"
                  />

                  {/* Stop in Arabic */}
                  <input
                    dir="rtl"
                    type="text"
                    value={stop.ar}
                    onChange={(e) => handleStopChange(e, index, "ar")}
                    placeholder={`التوقف ${index + 1} (بالعربية)`} // Placeholder in Arabic
                    className="w-full p-2 border border-black rounded-lg outline-none"
                  />
                </div>
              ))}

              {/* Add more stops */}
              <button
                className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                onClick={addStop}
              >
                Add Stop
              </button>

              <div className="flex gap-2">
                <button
                  className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                  onClick={() => handleDialog()}
                >
                  Close
                </button>

                {selectedData ? (
                  <button
                    className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                    onClick={() => handleCreate(true)}
                  >
                    {loading ? <Loader w={20} h={20} b={5} /> : "Update"}
                  </button>
                ) : (
                  <button
                    className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                    onClick={() => handleCreate(false)}
                  >
                    {loading ? <Loader w={20} h={20} b={5} /> : "Create"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-subtitle font-bold">All Courise</h1>
          <p className="text-small text-red">Manage your tour Courise</p>
        </div>
        <div>
          {mainUser && mainUser.role === "super-admin" && (
            <button
              className="px-5 bg-custom-yellow py-2 rounded-md duration-300 hover:bg-black hover:text-white"
              onClick={() => handleDialog()}
            >
              Create
            </button>
          )}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 flex-wrap">
        {console.log(categories)}
        {categories.map((card) => (
          <Card
            key={card?._id}
            title={card?.title ? card?.title[lang] : "Default Title"}
            operatorName={
              card?.operatorName ? card?.operatorName : "Default Title"
            }
            cruiseName={card?.cruiseName ? card?.cruiseName : "Default Title"}
            location={card?.location ? card?.location[lang] : "Default Title"}
            id={card?._id ? card?._id : "Default id"}
            handleRemove={() => handleRemove(card._id)}
            imageUrl={card?.coverImage || "default-image-url"} // Replace with a default image URL
            onClick={() => handleDialog(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateCategory;
