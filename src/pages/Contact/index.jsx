import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Map from "./Map";
import UserRefundRequestButton from "./UserRefundRequestButton";
import UserPaymentStatusCheck from "../Admin/Tickets/UserPaymentStatusCheck";

const Contact = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const lang = useSelector((state) => state.language.lang);
  const [datas, setDatas] = useState([]);

  const texts = {
    en: {
      heading: "How can we help?",
      paragraph:
        "We’ll help you find the right places and ways to get the most out of your visit to Qatar! Tell us a bit about yourself, and we’ll get in touch as soon as we can.",
      placeholders: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      },
      terms: "I agree with your terms & conditions.",
      button: "Send Message",
      faq: "Do you have doubts? FAQ",
    },
    ar: {
      heading: "كيف يمكننا مساعدتك؟",
      paragraph:
        "سوف نساعدك في العثور على الأماكن المناسبة والطرق التي تساعدك على الاستفادة القصوى من زيارتك إلى قطر! قل لنا قليلاً عن نفسك، وسنتواصل معك في أقرب وقت ممكن.",
      placeholders: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
      },
      terms: "أوافق على شروطك وأحكامك.",
      button: "إرسال الرسالة",
      faq: "هل لديك استفسارات؟ الأسئلة الشائعة",
    },
  };
  const { heading, paragraph, placeholders, terms, button, faq } =
    texts[lang] || texts.en;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(BASE_URL + "/locations");
        setDatas(data.data.data.locations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [BASE_URL]);
  return (
    <div>
      <Banner
        image={contactImg}
        title={"Contact"}
        subTitle={"Home | Contact"}
      />
      <div className="flex flex-wrap justify-center gap-20 mt-10">
        <div dir={lang === "ar" ? "rtl" : "ltr"} className="w-[600px]">
          <div>
            <h1 className="text-3xl font-bold text-dark">{heading}</h1>
            <p className="text-gray">{paragraph}</p>

            <form
              className="space-y-5 mt-10"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <div className="flex justify-center items-center gap-5 flex-col md:flex-row">
                <input
                  type="hidden"
                  name="access_key"
                  value="108ae0f6-d6f3-4e33-a5f9-f78231064313"
                />
                <input
                  type="text"
                  name="name"
                  placeholder={placeholders.name}
                  className="p-3 px-5 w-full outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                />
                <input
                  type="text"
                  name="email"
                  placeholder={placeholders.email}
                  className="p-3 w-full px-5 outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder={placeholders.subject}
                className="p-3 w-full px-5 outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
              />

              <textarea
                placeholder={placeholders.message}
                name="message"
                rows="5"
                className="p-3 w-full px-5 outline-none border border-gray-lite rounded-3xl focus:border-custom-yellow"
              />

              <label className="block">
                <Link to={"/termandconditions"}>
                  <span className="text-custom-yellow text-xl">{terms}</span>
                </Link>
              </label>
              <button
                type="submit"
                className="w-full py-2 bg-custom-yellow hover:bg-black hover:text-white duration-300 rounded-full"
              >
                {button}
              </button>
            </form>
            {/* Refund Request Button */}
            <UserRefundRequestButton />
            <Link to={"/faq"}>
              <p className="text-center text-lg mt-5">{faq}</p>
            </Link>
          </div>
        </div>
        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="w-full lg:w-[400px] flex justify-center"
        >
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-dark">
              {lang === "en"
                ? "Locations & Opening Times"
                : "المواقع وأوقات العمل"}
            </h2>
            {datas?.map((location) => (
              <Link key={location.id} to={location.url}>
                <div className="mt-4">
                  <h4 className="flex">
                    <FaMapPin className="w-7 h-7" />
                    &nbsp;
                    <span className="text-custom-yellow">
                      {location.title[lang]}
                    </span>
                  </h4>
                  <p>
                    {location.dates.map((time, index) => (
                      <span key={index}>
                        <span className="text-gray font-bold">
                          {time.day[lang]}:
                        </span>{" "}
                        {time.time}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="px-5 w-[600px]">
            <h2 className="text-3xl font-bold text-center">
              {lang === "ar" ? "موقعنا" : "Our Locations"}
            </h2>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
