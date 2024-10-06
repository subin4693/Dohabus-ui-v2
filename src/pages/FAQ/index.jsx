import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is imported
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Faq = () => {
  const lang = useSelector((state) => state.language.lang);
  const [faqs, setFaqs] = useState([]); // Moved inside the functional component

  useEffect(() => {
    const getFaq = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/faq`);
        setFaqs(response?.data?.data?.faqs || []);
      } catch (error) {
        console.error(
          "Error fetching FAQ:",
          error.response ? error.response.data : error.message
        );
      }
    };

    getFaq(); // Fetch FAQs
  }, [BASE_URL]);

  return (
    <div
      style={{
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      <Banner
        image={contactImg}
        title={
          lang === "ar"
            ? "اعثر على إجابات للأسئلة الشائعة"
            : "Find Answers to Frequently Asked Questions"
        }
        subTitle={lang === "ar" ? "الصفحة الرئيسية | الأسئلة الشائعة" : "Home | FAQ"}
      />

      <div className="p-6">
        <div className="mx-auto mt-8 max-w-4xl divide-y divide-neutral-200 mb-5 border p-10 border-4 rounded-2xl">
          {faqs.map((item, index) => (
            <div
              key={index}
              style={{
                borderTop: "2px solid #686D76",
                borderBottom: "2px solid #686D76",
              }}
              className="p-3 mt-5"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-lg">
                  <span>{item?.question?.[lang]}</span>
                  <span className="transition-transform duration-300 transform group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 transition-opacity duration-500 ease-in-out max-h-[1000px] overflow-hidden group-open:max-h-[1000px] group-open:opacity-100 opacity-0">
                  {item?.answer?.[lang]}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
