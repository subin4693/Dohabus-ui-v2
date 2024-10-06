import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is imported

const FAQComponent = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerAr, setAnswerAr] = useState("");
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset fields when closing the modal
    setTitle("");
    setTitleAr("");
    setAnswer("");
    setAnswerAr("");
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        question: {
          en: title,
          ar: titleAr,
        },
        answer: {
          en: answer,
          ar: answerAr,
        },
      };

      const response = await axios.post(`${BASE_URL}/faq`, {
        question: {
          en: title,
          ar: titleAr,
        },
        answer: {
          en: answer,
          ar: answerAr,
        },
      });

      console.log("New FAQ added:", response.data);
      let updatedCategory;
      updatedCategory = response.data.data.faq;

      setFaqs((prevCategories) => [...prevCategories, updatedCategory]);
      closeModal();
      // Optionally, fetch FAQs again to update the displayed list
    } catch (error) {
      console.error(
        "Error creating FAQ:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "titleAr") setTitleAr(value);
    if (name === "answer") setAnswer(value);
    if (name === "answerAr") setAnswerAr(value);
  };

  const lang = useSelector((state) => state.language.lang);
  const data = [
    // Your existing FAQ data
  ];

  useEffect(() => {
    const getFaq = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/faq`);

        setFaqs(response?.data?.data?.faqs || []);
      } catch (error) {
        console.error(
          "Error fetching Faq:",
          error.response ? error.response.data : error.message
        );
      }
    };

    getFaq(); // Fetch plans
  }, [BASE_URL]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/faq/${id}`);
      setFaqs((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting offer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="text-end">
        {user && user?.role === "super-admin" && (
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add FAQ
          </button>
        )}
      </div>
      <div className="flex justify-center items-center">
        {isOpen && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
          >
            <div
              className="bg-white rounded-lg p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Add FAQ</h2>
              <div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                  className="w-full border p-2 outline-none mt-3"
                  placeholder="Question in English"
                />
                <textarea
                  className="w-full border p-2 outline-none mt-3"
                  name="answer"
                  value={answer}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Answer in English"
                />
                <input
                  type="text"
                  name="titleAr"
                  value={titleAr}
                  onChange={handleInputChange}
                  className="w-full border p-2 outline-none text-end mt-3"
                  placeholder="السؤال بالعربية"
                />
                <textarea
                  className="w-full border p-2 outline-none text-end mt-3"
                  name="answerAr"
                  value={answerAr}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="الإجابة باللغة العربية"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded mt-3"
              >
                {loading ? "Loading..." : "Add"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          direction: lang === "ar" ? "rtl" : "ltr",
        }}
      >
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
                    <span className="" onClick={() => handleDelete(item?._id)}>
                      Delete
                    </span>
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
    </div>
  );
};

export default FAQComponent;
