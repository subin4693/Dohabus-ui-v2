import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { useSelector } from "react-redux";
import contactImg from "../../assets/contact.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const GuidelinesPage = () => {
  const [guidelinesData, setGuidelinesData] = useState([]);
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
      try {
        const res = await axios.get(`${BASE_URL}/guidelines`);

        setGuidelinesData(res?.data?.data);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching guidelines.");
      }
    };
    getData();
  }, [BASE_URL]);
  console.log(guidelinesData);
  return (
    <div className="">
      <Banner
        image={contactImg}
        title={selectedContent.title}
        subTitle={selectedContent.subTitle}
      />
      <div className="">
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            {selectedContent.heading}
          </h1>
          <div className="space-y-6">
            {guidelinesData ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {lang === "ar"
                    ? guidelinesData?.heading?.ar 
                    : guidelinesData?.heading?.en}
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {guidelinesData?.points?.map((point, idx) => (
                    <li key={idx} className="text-gray-700">
                      {lang === "ar" ? point.ar : point.en}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-center text-gray-700">
                No guidelines available at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
