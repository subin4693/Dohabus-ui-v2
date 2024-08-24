import { HiArrowLongRight, HiArrowLongDown } from "react-icons/hi2";
import React, { useState } from "react";

const TourPlanForm = ({ onClose }) => {
    // State variables managing both English (en) and Arabic (an) fields
    const [category, setCategory] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [title, setTitle] = useState({ en: "", an: "" });
    const [itinerary, setItinerary] = useState({ en: "", an: "" });
    const [highlights, setHighlights] = useState([{ en: "", an: "" }]);
    const [timings, setTimings] = useState([{ en: "", an: "" }]);
    const [includes, setIncludes] = useState([{ en: "", an: "" }]);
    const [excludes, setExcludes] = useState([{ en: "", an: "" }]);
    const [importantInformations, setImportantInformations] = useState([
        { en: "", an: "" },
    ]);
    const [cancellationpolicy, setCancellationPolicy] = useState([
        { en: "", an: "" },
    ]);
    const [gallerys, setGallerys] = useState([]);
    const [price, setPrice] = useState([
        {
            type: { en: "title", an: "العنوان" },
            detail: [
                { en: "detail1", an: "تفصيل1" },
                { en: "detail2", an: "تفصيل2" },
            ],
        },
    ]);

    const categories = [
        { _id: "1", type: "cate1" },
        { _id: "2", type: "cate2" },
        { _id: "3", type: "cate3" },
    ];

    const handleFileChange = (e, setState) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddColumn = () => {
        setPrice(
            price.map((row) => ({
                ...row,
                detail: [...row.detail, { en: "newDetail", an: "تفصيل جديد" }],
            })),
        );
    };

    const handleAddRow = () => {
        setPrice([
            ...price,
            {
                type: { en: "newTitle", an: "عنوان جديد" },
                detail: new Array(price[0].detail.length).fill({
                    en: "newDetail",
                    an: "تفصيل جديد",
                }),
            },
        ]);
    };

    const handleGalleryFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrls.push(reader.result);
                if (imageUrls.length === files.length) {
                    setGallerys((prev) => [...prev, ...imageUrls]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleArrayChange = (e, index, setState, lang) => {
        const { value } = e.target;
        setState((prev) => {
            const updatedArray = [...prev];
            updatedArray[index][lang] = value;
            return updatedArray;
        });
    };

    const handleAddArrayItem = (setState) => {
        setState((prev) => [...prev, { en: "", an: "" }]);
    };

    const handleSubmit = () => {
        const formData = {
            category,
            coverImage,
            title,
            itinerary,
            highlights,
            timings,
            includes,
            excludes,
            importantInformations,
            cancellationpolicy,
            gallerys,
        };
        console.log("Form Data Submitted:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white-1/2 bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center overflow-auto">
            <div className="bg-white shadow-xl rounded-lg w-full md:w-[800px] max-h-[80vh] overflow-y-auto p-5">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Create Tour Plan
                    </h2>

                    <div className="space-y-5">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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
                            onChange={(e) => handleFileChange(e, setCoverImage)}
                            className="w-full p-2 border border-black rounded-lg outline-none"
                        />
                        {coverImage && (
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-[200px] object-cover rounded-lg mt-2"
                            />
                        )}
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={title.en}
                                onChange={(e) =>
                                    setTitle({ ...title, en: e.target.value })
                                }
                                placeholder="Title (English)"
                                className="w-full p-2 border border-black rounded-lg outline-none"
                            />
                            <input
                                type="text"
                                value={title.an}
                                onChange={(e) =>
                                    setTitle({ ...title, an: e.target.value })
                                }
                                placeholder="Title (Arabic)"
                                className="w-full p-2 border border-black rounded-lg outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <textarea
                                value={itinerary.en}
                                onChange={(e) =>
                                    setItinerary({
                                        ...itinerary,
                                        en: e.target.value,
                                    })
                                }
                                placeholder="Itinerary (English)"
                                className="w-full h-[150px] p-2 border border-black rounded-lg outline-none resize-none"
                            />
                            <textarea
                                value={itinerary.an}
                                onChange={(e) =>
                                    setItinerary({
                                        ...itinerary,
                                        an: e.target.value,
                                    })
                                }
                                placeholder="Itinerary (Arabic)"
                                className="w-full h-[150px] p-2 border border-black rounded-lg outline-none resize-none"
                            />
                        </div>
                        <FieldArray
                            title="Highlights"
                            data={highlights}
                            setState={setHighlights}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        <FieldArray
                            title="Timings"
                            data={timings}
                            setState={setTimings}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        // Continue from where you left off...
                        <FieldArray
                            title="Includes"
                            data={includes}
                            setState={setIncludes}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        <FieldArray
                            title="Excludes"
                            data={excludes}
                            setState={setExcludes}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        <FieldArray
                            title="Important Informations"
                            data={importantInformations}
                            setState={setImportantInformations}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        <FieldArray
                            title="Cancellation Policy"
                            data={cancellationpolicy}
                            setState={setCancellationPolicy}
                            handleArrayChange={handleArrayChange}
                            handleAddArrayItem={handleAddArrayItem}
                        />
                        <div className="space-y-2">
                            <label className="font-bold">Gallery</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleGalleryFileChange}
                                className="w-full p-2 border border-black rounded-lg outline-none"
                            />
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                {gallerys.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-[150px] object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold">Pricing</label>
                            {price.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="border p-4 rounded-lg space-y-2"
                                >
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={row.type.en}
                                            onChange={(e) =>
                                                setPrice((prev) => {
                                                    const updatedPrice = [
                                                        ...prev,
                                                    ];
                                                    updatedPrice[
                                                        rowIndex
                                                    ].type.en = e.target.value;
                                                    return updatedPrice;
                                                })
                                            }
                                            placeholder="Type (English)"
                                            className="w-full p-2 border border-black rounded-lg outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={row.type.an}
                                            onChange={(e) =>
                                                setPrice((prev) => {
                                                    const updatedPrice = [
                                                        ...prev,
                                                    ];
                                                    updatedPrice[
                                                        rowIndex
                                                    ].type.an = e.target.value;
                                                    return updatedPrice;
                                                })
                                            }
                                            placeholder="Type (Arabic)"
                                            className="w-full p-2 border border-black rounded-lg outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        {row.detail.map(
                                            (detail, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    className="space-y-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={detail.en}
                                                        onChange={(e) =>
                                                            setPrice((prev) => {
                                                                const updatedPrice =
                                                                    [...prev];
                                                                updatedPrice[
                                                                    rowIndex
                                                                ].detail[
                                                                    detailIndex
                                                                ].en =
                                                                    e.target.value;
                                                                return updatedPrice;
                                                            })
                                                        }
                                                        placeholder="Detail (English)"
                                                        className="w-full p-2 border border-black rounded-lg outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={detail.an}
                                                        onChange={(e) =>
                                                            setPrice((prev) => {
                                                                const updatedPrice =
                                                                    [...prev];
                                                                updatedPrice[
                                                                    rowIndex
                                                                ].detail[
                                                                    detailIndex
                                                                ].an =
                                                                    e.target.value;
                                                                return updatedPrice;
                                                            })
                                                        }
                                                        placeholder="Detail (Arabic)"
                                                        className="w-full p-2 border border-black rounded-lg outline-none"
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={handleAddRow}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Add Row
                                </button>
                                <button
                                    onClick={handleAddColumn}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Add Column
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// FieldArray Component
const FieldArray = ({
    title,
    data,
    setState,
    handleArrayChange,
    handleAddArrayItem,
}) => {
    return (
        <div className="space-y-2">
            <label className="font-bold">{title}</label>
            {data.map((item, index) => (
                <div key={index} className="space-y-2">
                    <input
                        type="text"
                        value={item.en}
                        onChange={(e) =>
                            handleArrayChange(e, index, setState, "en")
                        }
                        placeholder={`${title} (English)`}
                        className="w-full p-2 border border-black rounded-lg outline-none"
                    />
                    <input
                        type="text"
                        value={item.an}
                        onChange={(e) =>
                            handleArrayChange(e, index, setState, "an")
                        }
                        placeholder={`${title} (Arabic)`}
                        className="w-full p-2 border border-black rounded-lg outline-none"
                    />
                </div>
            ))}
            <button
                onClick={() => handleAddArrayItem(setState)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
                Add {title}
            </button>
        </div>
    );
};

export default TourPlanForm;
