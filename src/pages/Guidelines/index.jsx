import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { useSelector } from "react-redux";
import contactImg from "../../assets/contact.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const index = () => {
  const [guidelineTxt, setGuidelineTxt] = useState({});
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Object containing guidelines content for both English and Arabic
  const content = {
    en: {
      title: "Guidelines",
      subTitle: "Home | Guidelines",
      heading: "Read Guidelines",
    },
    ar: {
      title: "إرشادات",
      subTitle: "الصفحة الرئيسية | إرشادات",
      heading: "اقرأ الإرشادات",
    },
  };

  const selectedContent = content[lang];

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
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Banner
        image={contactImg}
        title={selectedContent.title}
        subTitle={selectedContent.subTitle}
      />
      <div className="mx-2 sm:mx-10" dir={lang === "ar" ? "rtl" : "ltr"}>
        <h1 className="text-center text-5xl mt-3 font-semibold text-custom-yellow">
          {selectedContent.heading}
        </h1>
        <div className="text-2xl text-start py-10 px-5">
          {guidelineTxt?.text?.[lang]?.split("\n").map((paragraph, index) => (
            <p className="mt-3" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
