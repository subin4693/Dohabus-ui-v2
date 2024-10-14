import React, { useState, useEffect } from "react";
import InputCard from "./InputCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";

const GuideLine = () => {
  const lang = useSelector((state) => state.language.lang);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showCard, setShowCard] = useState(false);
  const [guideLineTxt, setGuidelineTxt] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editedText, setEditedText] = useState({
    heading: { en: "", ar: "" },
    points: [{ en: "", ar: "" }],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/guidelines`);
        setGuidelineTxt(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching guidelines.");
      }
    };
    getData();
  }, [BASE_URL]);

  const handleCreate = () => {
    setCurrentEditId(null); // Reset current edit ID
    setShowCard(true); // Show the input card
    // Reset the editedText state for new guideline creation
    setEditedText({
      heading: { en: "", ar: "" },
      points: [{ en: "", ar: "" }],
    });
  };

  const handleRemove = async (id) => {
    try {
      if (id) {
        // Make delete request to the server
        const res = await axios.delete(`${BASE_URL}/guidelines/${id}`);

        // Show success message
        toast.success("Guide deleted successfully!", {
          theme: "dark",
        });

        // Update the state to remove the deleted cruise from the UI
        setGuidelineTxt((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      }
    } catch (error) {
      // Show error message
      toast.error("Failed to delete Guide.", { theme: "dark" });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Guide Line</h1>
        <button
          className="bg-custom-yellow p-2 px-10 flex justify-center items-center rounded-md hover:bg-dark duration-200 hover:text-white"
          onClick={handleCreate} // Call the create handler
        >
          Create
        </button>
      </div>

      <div>
        <br />
        <div className="flex gap-5 flex-wrap justify-center">
          {guideLineTxt.map((item) => (
            <div
              key={item?._id}
              className="mb-4 border w-[300px] h-[200px] p-5 bg-gray-200 overflow-hidden"
            >
              <h1 className="h-[72%] overflow-hidden">
                {item?.heading?.[lang]}
              </h1>
              <div className="flex justify-between itesm-center mt-5">
                <button
                  className="bg-custom-yellow p-2 px-10 flex justify-center items-center rounded-md hover:bg-dark duration-200 hover:text-white "
                  onClick={() => {
                    setCurrentEditId(item?._id);
                    setShowCard(true);
                    setEditedText({
                      heading: item?.heading,
                      points: item?.points,
                    });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleRemove(item?._id)}>
                  <BiTrash size={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>

      {showCard && (
        <InputCard
          setShowCard={setShowCard}
          guideLineTxt={editedText.heading[lang]} // Pass heading for editing or empty for new
          guideLineId={currentEditId} // Pass the currentEditId (null for new)
          guideLineTxts={
            currentEditId
              ? guideLineTxt.find((item) => item._id === currentEditId)
              : null
          } // Pass the entire object for editing
          setGuidelineTxt={setGuidelineTxt} // This will be used to update the list after creation or editing
          editedText={editedText} // Pass the edited text for the new guideline
          setEditedText={setEditedText} // Pass function to update the edited text
        />
      )}
    </div>
  );
};

export default GuideLine;
