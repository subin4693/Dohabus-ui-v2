import React, { useState } from "react";
import Loading from "../../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
const InputCard = ({
    setShowCard,
    guideLineTxt,
    setGuidelineTxt,
    guideLineId,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [editedText, setEditedText] = useState(guideLineTxt);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(
                BASE_URL + "/guidelines/" + guideLineId,
                {
                    data: editedText,
                }
            );
            console.log(res);
            if (res.data.message?.toLowerCase() != "success") {
                setLoading(false);
                toast.error("Something went wrong please try again later");
                return;
            }
            setGuidelineTxt(res.data.data);
            setShowCard((prev) => !prev);
            console.log(res.data.data.text);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex- w-full md:w-[800px] gap-4 p-5 border shadow-xl">
                <textarea
                    className="border w -full p-4 w-full max-h-[40vh]"
                    placeholder="Guidelies in english"
                    rows="8"
                    value={editedText.en}
                    onChange={(e) =>
                        setEditedText((prev) => ({
                            ...prev,
                            en: e.target.value,
                        }))
                    }
                />
                <textarea
                    className="border w -full p-4 w-full max-h-[40vh]"
                    placeholder="Guidelies in Arabic"
                    rows="8"
                    dir={"rtl"}
                    value={editedText.ar}
                    onChange={(e) =>
                        setEditedText((prev) => ({
                            ...prev,
                            ar: e.target.value,
                        }))
                    }
                />
                <div className="flex  w-full gap-5 flex-col md:flex-row mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-custom-yellow  p-2 flex-1  rounded-md hover:bg-dark duration-200 hover:text-white"
                    >
                        {loading ? <Loading h="5" /> : "Submit"}
                    </button>

                    <button
                        onClick={() => setShowCard((prev) => !prev)}
                        className="bg-custom-red  p-2 flex-1  rounded-md hover:bg-dark duration-200 text-white"
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
