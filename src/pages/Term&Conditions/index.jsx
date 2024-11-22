import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const index = () => {
  const [termsAndCunditions, setTermsAndCunditions] = useState("");
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')

  const getData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/termsandconditions");
      console.log(res.data);
      setTermsAndCunditions(res?.data?.termsAndCondition);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      <div className="p-8 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-6">
          {lang === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}
        </h1>
        {console.log(termsAndCunditions)}
        <div
          className="view ql-editor"
          dangerouslySetInnerHTML={{ __html: termsAndCunditions?.text }}
        ></div>
      </div>
    </div>
  );
};

export default index;
