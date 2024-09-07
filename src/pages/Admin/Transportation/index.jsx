import React, { useState, useEffect } from "react";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import Card from "./Card";
import { toast } from "react-toastify";

const Transportation = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure BASE_URL is set properly
  const [image, setImage] = useState(null);
  const lang = useSelector((state) => state.language.lang);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [type, setType] = useState({ en: "", ar: "" });
  const [passenger, setPassenger] = useState("");
  const [luggage, setLuggage] = useState("");
  const [other, setOther] = useState({ en: "", ar: "" });
  const [file, setFile] = useState(null);
  const [transportations, setTransportations] = useState([]);
  const mainUser = useSelector((state) => state.user.user);

  const handleImageChange = (e) => {
    console.log("Working IMG");
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Set the file state to trigger Firebase upload
    }
  };

  const handleCreate = async (isEdit) => {
    try {
      let updatedFleet;
      if (isEdit) {
        // Edit an existing transportation fleet
        const res = await axios.put(
          `${BASE_URL}/transportations/${selectedData._id}`,
          {
            title,
            type,
            passenger,
            luggage,
            other,
            coverImage: image,
          },
        );
        updatedFleet = res.data.data.transportation;

        // Update the fleet in the state
        setTransportations((prevTransportations) =>
          prevTransportations.map((fleet) =>
            fleet._id === updatedFleet._id ? updatedFleet : fleet,
          ),
        );

        toast.success("Transportation fleet updated");
      } else {
        // Create a new transportation fleet
        // if (!file) {
        //   return toast.warn("Please select an image");
        // }

        // if (!image) {
        //   return toast.warn("Image is uploading, wait a second");
        // }
        const res = await axios.post(`${BASE_URL}/transportations`, {
          title,
          type,
          passenger,
          luggage,
          other,
          coverImage: image,
        });

        updatedFleet = res.data.data.transportation;

        // Add the new fleet to the end of the state array
        setTransportations((prevTransportations) => [
          ...prevTransportations,
          updatedFleet,
        ]);

        toast.success("New transportation fleet created");
      }

      // Close the modal or form
      setIsOpen(false);

      // Reset form fields
      setTitle({ en: "", ar: "" });
      setType({ en: "", ar: "" });
      setPassenger("");
      setLuggage("");
      setOther({ en: "", ar: "" });
      setImage(null);
      setSelectedData(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
  };

  //   const handleDialog = (data = null) => {
  //     if (data) {
  //       // Edit mode
  //       setSelectedData(data);
  //       setTitle(data.title);
  //       setType(data.type);
  //       setPassenger(data.passenger);
  //       setLuggage(data.luggage);
  //       setOther(data.other);
  //       setImage(data.coverImage);
  //     } else {
  //       // Create mode
  //       setSelectedData(null);
  //       setTitle({ en: "", ar: "" });
  //       setType({ en: "", ar: "" });
  //       setPassenger("");
  //       setLuggage("");
  //       setOther({ en: "", ar: "" });
  //       setImage(null);
  //     }
  //     setIsOpen(true);
  //   };

  const handleDialog = (data = null) => {
    if (mainUser.role !== "super-admin") return;
    if (data) {
      // Edit mode
      console.log(data);
      setSelectedData(data);
      setTitle(data.title);
      setType(data.type);
      setPassenger(data.passenger);
      setLuggage(data.luggage);
      setOther(data.other);
      setImage(data.coverImage);
    } else {
      // Create mode
      setSelectedData(null);
      setTitle({ en: "", ar: "" });
      setType({ en: "", ar: "" });
      setPassenger("");
      setLuggage("");
      setOther({ en: "", ar: "" });
      setImage(null);
    }
    setIsOpen((prev) => !prev);
  };

  const switchActive = async (id) => {
    if (mainUser.role !== "super-admin") return;
    try {
      // Edit an existing transportation fleet
      const res = await axios.patch(`${BASE_URL}/transportations/${id}`);
      let updatedFleet = res.data.data;

      // Update the fleet in the state
      setTransportations((prevTransportations) =>
        prevTransportations.map((fleet) =>
          fleet._id === updatedFleet._id ? updatedFleet : fleet,
        ),
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
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
        const res = await axios.get(`${BASE_URL}/transportations/admin`);
        setTransportations(res.data.data.transportations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
                placeholder="العنوان (بالعربية)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Type of vehicle in English */}
              <input
                type="text"
                value={type.en}
                onChange={(e) =>
                  setType((prev) => ({
                    ...prev,
                    en: e.target.value,
                  }))
                }
                placeholder="Type of Vehicle (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Type of vehicle in Arabic */}
              <input
                dir="rtl"
                type="text"
                value={type.ar}
                onChange={(e) =>
                  setType((prev) => ({
                    ...prev,
                    ar: e.target.value,
                  }))
                }
                placeholder="نوع المركبة (بالعربية)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Passenger capacity */}
              <input
                type="number"
                value={passenger}
                onChange={(e) => setPassenger(e.target.value)}
                placeholder="Passenger Capacity"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Luggage capacity */}
              <input
                type="text"
                value={luggage}
                onChange={(e) => setLuggage(e.target.value)}
                placeholder="Luggage Capacity"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Other information in English */}
              <input
                type="text"
                value={other.en}
                onChange={(e) =>
                  setOther((prev) => ({
                    ...prev,
                    en: e.target.value,
                  }))
                }
                placeholder="Other Info (English)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              {/* Other information in Arabic */}
              <input
                dir="rtl"
                type="text"
                value={other.ar}
                onChange={(e) =>
                  setOther((prev) => ({
                    ...prev,
                    ar: e.target.value,
                  }))
                }
                placeholder="معلومات أخرى (بالعربية)"
                className="w-full p-2 border border-black rounded-lg outline-none"
              />

              <div className="flex justify-between">
                <button
                  onClick={() => handleCreate(selectedData !== null)}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  {selectedData ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mainUser && mainUser.role === "super-admin" && (
        <button
          onClick={() => handleDialog(null)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-4 hover:bg-blue-600"
        >
          Create New Transportation
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transportations.map((transport) => (
          <Card
            key={transport._id}
            title={transport.title.en}
            imageUrl={transport.coverImage}
            isActive={transport.isActive}
            transid={transport._id}
            switchActive={switchActive}
            onClick={() => handleDialog(transport)}
          />

          // key={card._id}
          //            transid={card._id}
          //            title={card.title[lang]}
          //            places={card.places}
          //            lang={lang}
          //            imageUrl={card.coverImage}
          //            onClick={() => handleDialog(card)}
          //            switchActive={switchActive}
          //            isActive={card.isActive}
        ))}
      </div>
    </div>
  );
};

export default Transportation;