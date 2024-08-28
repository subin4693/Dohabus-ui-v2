import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import Card from "./Card";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import axios from "axios";

const CreateCategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const { progress, error, downloadURL } = useFirebaseUpload(file);

  useEffect(() => {
    if (downloadURL) {
      console.log("Image URL from Firebase:", downloadURL);
      setImage(downloadURL);
    }
  }, [downloadURL]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categorys`);
        setCategories(response.data.data.categories);
        console.log("Categorys", categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [BASE_URL]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleCreate = async () => {
    try {
      if (!downloadURL) {
        alert("Please wait for the image to finish uploading.");
        return;
      }

      const formData = {
        title,
        description,
        coverImage: downloadURL,
      };

      console.log("Form data:", formData);

      if (selectedData) {
        console.log(selectedData);
        await axios.put(`${BASE_URL}/categorys/${selectedData._id}`, formData);
        alert("Category updated successfully");
      } else {
        // Create new category
        await axios.post(`${BASE_URL}/categorys`, formData);
        alert("Category created successfully");
      }

      setIsOpen(false);
      setTitle({ en: "", ar: "" });
      setDescription({ en: "", ar: "" });
      setImage(null);
      setSelectedData(null);

      const response = await axios.get(`${BASE_URL}/categorys`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error creating/updating category:", error);
      alert("There was an error submitting the form.");
    }
  };

  const handleDialog = (data = null) => {
    if (data) {
      setSelectedData(data);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.coverImage);
    } else {
      setSelectedData(null);
      setTitle({ en: "", ar: "" });
      setDescription({ en: "", ar: "" });
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
                    onClick={() => setImage(null)}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </label>
            </div>
            <div className="flex-1 space-y-5">
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
              <textarea
                value={description.en}
                onChange={(e) =>
                  setDescription((prev) => ({
                    ...prev,
                    en: e.target.value,
                  }))
                }
                placeholder="Description (English)"
                className="w-full h-[100px] p-2 border border-black rounded-lg outline-none resize-none"
              />
              <textarea
                dir="rtl"
                value={description.ar}
                onChange={(e) =>
                  setDescription((prev) => ({
                    ...prev,
                    ar: e.target.value,
                  }))
                }
                placeholder="الوصف (بالعربية)"
                className="w-full h-[100px] p-2 border border-black rounded-lg outline-none resize-none"
              />
              <div className="flex gap-2">
                <button
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
          <p className="text-small text-red">Manage your tour categories</p>
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

      {/* Display categories using map */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 flex-wrap">
        {categories.length > 0 ? (
          categories &&
          categories.map((category) => (
            <Card
              key={category._id}
              title={category.title.en} // Adjust this if your title object has different structure
              description={category.description.en} // Adjust this if your description object has different structure
              imageUrl={category.coverImage} // Ensure this field matches your backend data
              onClick={() => handleDialog(category)}
            />
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
