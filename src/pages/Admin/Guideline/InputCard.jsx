import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const InputCard = ({
  setShowCard,
  guideLineTxt,
  setGuidelineTxt,
  guideLineId,
  guideLineTxts,
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const lang = useSelector((state) => state.language.lang); // Get the current language

  const [editedText, setEditedText] = useState({
    heading: { en: "", ar: "" },
    points: [{ en: "", ar: "" }],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guideLineTxts) {
      setEditedText({
        heading: guideLineTxts.heading || { en: "", ar: "" },
        points: guideLineTxts.points || [{ en: "", ar: "" }],
      });
    }
  }, [guideLineTxts]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res;

      if (guideLineId) {
        // Editing an existing guideline
        res = await axios.put(`${BASE_URL}/guidelines/${guideLineId}`, {
          data: editedText,
        });

        // Update the guideline in state
        setGuidelineTxt((prev) =>
          prev.map((item) => (item._id === guideLineId ? res.data.data : item))
        );
        toast.success("Guideline updated successfully");
      } else {
        // Creating a new guideline
        res = await axios.post(`${BASE_URL}/guidelines`, {
          data: editedText,
        });

        // Add the new guideline to state
        setGuidelineTxt((prev) => [...prev, res.data.data]);
        toast.success("Guideline created successfully");
      }

      setShowCard(false);
    } catch (error) {
      console.log(error);
      toast.error("Error saving guideline");
    } finally {
      setLoading(false);
    }
  };

  const handlePointChange = (index, lang, value) => {
    setEditedText((prev) => {
      const newPoints = [...prev.points];
      newPoints[index] = { ...newPoints[index], [lang]: value };
      return { ...prev, points: newPoints };
    });
  };

  const addPoint = () => {
    setEditedText((prev) => ({
      ...prev,
      points: [...prev.points, { en: "", ar: "" }],
    }));
  };

  const removePoint = (index) => {
    setEditedText((prev) => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col w-full md:w-[800px] gap-4 p-5 border shadow-xl">
        <div className="max-h-[70vh] overflow-y-auto">
          <h3 className="text-lg font-bold">Edit Guideline Heading</h3>
          <input
            className="border p-4 w-full"
            placeholder="Heading in English"
            value={editedText.heading.en}
            onChange={(e) =>
              setEditedText((prev) => ({
                ...prev,
                heading: { ...prev.heading, en: e.target.value },
              }))
            }
          />
          <input
            className="border p-4 w-full"
            placeholder="Heading in Arabic"
            dir="rtl"
            value={editedText.heading.ar}
            onChange={(e) =>
              setEditedText((prev) => ({
                ...prev,
                heading: { ...prev.heading, ar: e.target.value },
              }))
            }
          />
          <h3 className="text-lg font-bold">Edit Points</h3>
          {editedText.points.map((point, index) => (
            <div key={index} className="mb-4 flex items-center gap-2">
              <input
                className="border p-4 w-full"
                placeholder="Point in English"
                value={point.en}
                onChange={(e) => handlePointChange(index, "en", e.target.value)}
              />
              <input
                className="border p-4 w-full"
                placeholder="Point in Arabic"
                dir="rtl"
                value={point.ar}
                onChange={(e) => handlePointChange(index, "ar", e.target.value)}
              />
              <button
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={() => removePoint(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-custom-yellow p-2 rounded-md"
            onClick={addPoint}
          >
            Add Point
          </button>
        </div>

        <div className="flex w-full gap-5 flex-col md:flex-row mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-custom-yellow p-2 flex-1 rounded-md hover:bg-dark duration-200 hover:text-white"
          >
            {loading ? <Loading h="5" /> : "Submit"}
          </button>

          <button
            onClick={() => setShowCard(false)}
            className="bg-custom-red p-2 flex-1 rounded-md hover:bg-dark duration-200 text-white"
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
