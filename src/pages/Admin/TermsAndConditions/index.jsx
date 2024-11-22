import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const TermsAndCondition = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const [id, setId] = useState(null);
  const mainUser = useSelector((state) => state.user.user);
  const handelSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.put(BASE_URL + "/termsandconditions/" + id, {
        text,
      });

      setText(response?.data?.termsAndCondition.text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(text);
  };

  const getData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/termsandconditions");
      console.log(res.data);
      setText(res?.data?.termsAndCondition?.text);
      setId(res?.data?.termsAndCondition?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="h-[50vh] mb-20    ">
        {console.log(text)}{" "}
        <ReactQuill
          readOnly={mainUser.role !== "super-admin"}
          style={{
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
          theme="snow"
          value={text}
          onChange={setText}
          placeholder={
            lang === "ar" ? "ابدأ المدونة هنا..." : "Start blog here..."
          }
          className="w-full h-full      "
          modules={{
            toolbar: [
              [{ size: ["small", false, "large", "huge"] }], // Custom font sizes
              ["bold", "italic", "underline"],
              [{ color: ["red"] }], // Add color selector
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
            ],
          }}
        />
      </div>
      <div className="  flex justify-end">
        <button
          onClick={handelSubmit}
          className="bg-custom-yellow text-center px-2 py-1 rounded-md hover:bg-dark hover:text-white  duration-100"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
};

export default TermsAndCondition;
