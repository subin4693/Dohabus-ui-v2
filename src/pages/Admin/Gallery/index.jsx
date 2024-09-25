import React, { useState, useEffect } from "react";
import axios from "axios";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload"; // Import your custom Firebase hook
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Gallery = () => {
  const mainUser = useSelector((state) => state.user.user);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [images, setImages] = useState([]);
  const [awards, setAwards] = useState([]);
  const [file, setFile] = useState(null);
  const [awardFile, setAwardFile] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const [editingAwardId, setEditingAwardId] = useState(null);

  // Use the custom Firebase upload hook for images
  const { downloadURL } = useFirebaseUpload(file);

  // Use the custom Firebase upload hook for awards
  const { downloadURL: awardDownloadURL } = useFirebaseUpload(awardFile);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const imageResponse = await axios.get(`${BASE_URL}/footer`);
      setImages(imageResponse.data.images || []); // Ensure it's an array

      const awardResponse = await axios.get(`${BASE_URL}/award`);
      setAwards(awardResponse.data.images || []); // Ensure it's an array
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle image upload or edit
  useEffect(() => {
    const saveImageToGallery = async (imageUrl) => {
      try {
        if (editingImageId) {
          await axios.put(`${BASE_URL}/footer/${editingImageId}`, {
            imageUrl,
          });
        } else {
          await axios.post(`${BASE_URL}/footer`, {
            imageUrl,
          });
        }
        fetchData(); // Re-fetch data to update the state
        toast.success("Image uploaded successfully!", { theme: "dark" });
      } catch {
        toast.error("Failed to save image.", { theme: "dark" });
      } finally {
        setEditingImageId(null);
      }
    };

    if (downloadURL) {
      saveImageToGallery(downloadURL);
    }
  }, [downloadURL]);

  // Handle award upload or edit
  useEffect(() => {
    const saveAwardToBackend = async (imageUrl) => {
      try {
        if (editingAwardId) {
          await axios.put(`${BASE_URL}/award/${editingAwardId}`, {
            imageUrl,
          });
        } else {
          await axios.post(`${BASE_URL}/award`, {
            imageUrl,
          });
        }
        fetchData(); // Re-fetch data to update the state
        toast.success("Award uploaded successfully!", { theme: "dark" });
      } catch {
        toast.error("Failed to save award.", { theme: "dark" });
      } finally {
        setEditingAwardId(null);
      }
    };

    if (awardDownloadURL) {
      saveAwardToBackend(awardDownloadURL);
    }
  }, [awardDownloadURL]);

  const handleImageChange = (e, imageId = null) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setEditingImageId(imageId);
    }
  };

  const handleAwardFileChange = (e, awardId = null) => {
    const file = e.target.files[0];
    if (file) {
      setAwardFile(file);
      setEditingAwardId(awardId);
    }
  };

  const handleRemove = async (id) => {
    try {
      if (id) {
        await axios.delete(`${BASE_URL}/award/${id}`);
        fetchData(); // Re-fetch data to update the state
        toast.success("Award deleted successfully!", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Failed to delete award.", { theme: "dark" });
      console.error(error);
    }
  };
  const handleRemoveGalery = async (id) => {
    try {
      if (id) {
        await axios.delete(`${BASE_URL}/footer/${id}`);
        fetchData(); // Re-fetch data to update the state
        toast.success("Footer deleted successfully!", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Failed to delete footer.", { theme: "dark" });
      console.error(error);
    }
  };

  const handleCreateNew = () =>
    document.getElementById("fileInput-new").click();
  const handleAddAwards = () =>
    document.getElementById("awardFileInput-new").click();

  return (
    <div className="p-4">
      {mainUser && mainUser.role === "super-admin" && (
        <>
          <div className="flex justify-between items-center">
            <button
              onClick={handleCreateNew}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create New Image
            </button>
            <button
              onClick={handleAddAwards}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add New Award
            </button>
          </div>
        </>
      )}

      <input
        type="file"
        id="fileInput-new"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <input
        type="file"
        id="awardFileInput-new"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleAwardFileChange}
      />
      <h2 className="text-2xl font-bold">Gallery Images:</h2>

      <div className="flex flex-wrap gap-5 mt-3">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className=" w-[300px]">
              <img
                src={image?.image}
                alt={`Gallery Image ${index + 1}`}
                className=" w-full  h-[200px] object-cover cursor-pointer transition-transform duration-200 transform group-hover:scale-105"
                onClick={() =>
                  document.getElementById(`fileInput-${index}`).click()
                }
              />
              <button
                onClick={() => handleRemoveGalery(image?._id)}
                className="bg-red-500 p-2  text-white h-[50px] w-full"
              >
                Remove
              </button>
              <input
                type="file"
                id={`fileInput-${index}`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, image._id)}
              />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
      <h2 className="mt-5 text-2xl font-bold">
        Awards: (Make sure admin only add 4 awards)
      </h2>
      <div className="flex flex-wrap gap-5 mt-3">
        {awards.length > 0 ? (
          awards.map((award, index) => (
            <div key={index} className="w-[300px]">
              <img
                src={award?.image}
                alt={`Award ${index + 1}`}
                className="w-full  h-[200px] object-cover cursor-pointer transition-transform duration-200 transform group-hover:scale-105"
                onClick={() =>
                  document.getElementById(`awardFileInput-${index}`).click()
                }
              />
              <button
                onClick={() => handleRemove(award._id)}
                className="bg-red-500 border p-2 mt-2 text-white w-full"
              >
                Remove
              </button>
              <input
                type="file"
                id={`awardFileInput-${index}`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleAwardFileChange(e, award._id)}
              />
            </div>
          ))
        ) : (
          <p>No awards available.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
