import React, { useState, useEffect } from "react";
import InputCard from "./InputCard";
import axios from "axios";
import { toast } from "react-toastify";

const GuideLine = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showCard, setShowCard] = useState(false);
  const [guideLineTxt, setGuidelineTxt] = useState({
    text: { en: "", ar: "" },
  });
  console.log(guideLineTxt);
  useEffect(() => {
    const getData = async () => {
      console.log("working fine");
      try {
        const res = await axios.get(BASE_URL + "/guidelines");

        if (res.data.message != "success") {
          toast.error("Something went wrong please try again later");
          return;
        }
        setGuidelineTxt(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Guide Line</h1>
        <button
          className="bg-custom-yellow  p-2 px-10  flex justify-center items-center    rounded-md hover:bg-dark duration-200 hover:text-white"
          onClick={() => setShowCard((prev) => !prev)}
        >
          Edit
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold ">Guideline in English</h2>
        <br />
        <p className="">{guideLineTxt?.text?.en}</p>
        <br />
        <h2 className="text-lg font-bold ">Guideline in Arabic</h2>
        <br />
        <p dir={"rtl"}>{guideLineTxt?.text?.ar}</p>
      </div>
      {showCard && (
        <InputCard
          setShowCard={setShowCard}
          guideLineTxt={guideLineTxt?.text}
          guideLineId={guideLineTxt?._id}
          setGuidelineTxt={setGuidelineTxt}
        />
      )}
    </div>
  );
};

export default GuideLine;
