import React, { useState } from "react";

const TourPlanForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        category: "",
        coverImage: null,
        title: "",
        description: "",
        date: [""],
        includes: [""],
        importantInformations: [""],
        notes: [""],
        gallerys: [],
        price: "",
    });

    const categories = [
        { _id: "1", type: "cate1" },
        { _id: "2", type: "cate2" },
        { _id: "3", type: "cate3" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrls.push(reader.result);
                if (imageUrls.length === files.length) {
                    setFormData((prev) => ({
                        ...prev,
                        gallerys: [...prev.gallerys, ...imageUrls],
                    }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleArrayChange = (e, index, key) => {
        const { value } = e.target;
        setFormData((prev) => {
            const updatedArray = [...prev[key]];
            updatedArray[index] = value;
            return { ...prev, [key]: updatedArray };
        });
    };

    const handleAddArrayItem = (key) => {
        setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white-1/2 bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center overflow-auto">
            <div className="bg-white shadow-lg rounded-lg w-full md:w-[800px] mt-36 max-h-[80vh] overflow-y-auto p-5">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Create Tour Plan
                    </h2>

                    <div className="space-y-5">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-black rounded-lg outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.type}
                                </option>
                            ))}
                        </select>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "coverImage")}
                            className="w-full p-2 border border-black rounded-lg outline-none"
                        />
                        {formData.coverImage && (
                            <img
                                src={formData.coverImage}
                                alt="Cover"
                                className="w-full h-200 object-cover rounded-lg mt-2"
                            />
                        )}
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full p-2 border border-black rounded-lg outline-none"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full h-[150px] p-2 border border-black rounded-lg outline-none resize-none"
                        />

                        <FieldArray
                            title="Session"
                            data={formData.date}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={() =>
                                handleAddArrayItem("date")
                            }
                            keyName="date"
                        />
                        <FieldArray
                            title="Includes"
                            data={formData.includes}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={() =>
                                handleAddArrayItem("includes")
                            }
                            keyName="includes"
                        />
                        <FieldArray
                            title="Important Informations"
                            data={formData.importantInformations}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={() =>
                                handleAddArrayItem("importantInformations")
                            }
                            keyName="importantInformations"
                        />
                        <FieldArray
                            title="Notes"
                            data={formData.notes}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={() =>
                                handleAddArrayItem("notes")
                            }
                            keyName="notes"
                        />
                        <div className="space-y-2">
                            <h3 className="font-bold">Gallery Images</h3>
                            <input
                                type="file"
                                multiple
                                onChange={handleGalleryFileChange}
                                className="w-full p-2 border border-black rounded-lg outline-none"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.gallerys.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-[200px] h-[200px] object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full p-2 border border-black rounded-lg outline-none"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleSubmit}
                                className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                            >
                                Create
                            </button>
                            <button
                                onClick={onClose}
                                className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FieldArray = ({
    title,
    data,
    handleArrayChange,
    handleAddArrayItem,
    keyName,
}) => (
    <div className="space-y-2">
        <h3 className="font-bold">{title}</h3>
        {data.map((item, index) => (
            <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, keyName)}
                placeholder={`${title} ${index + 1}`}
                className="w-full p-2 border border-black rounded-lg outline-none"
            />
        ))}
        <button color="black" onClick={handleAddArrayItem}>
            Add More {title}
        </button>
    </div>
);

export default TourPlanForm;
