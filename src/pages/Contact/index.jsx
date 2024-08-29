import axios from "axios";
import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Contact = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const lang = useSelector((state) => state.language.lang);
    const [datas, setDatas] = useState([]);
    const locations = [
        {
            id: 1,
            title: {
                en: "IDoha Bus Head Office",
                ar: "مكتب حافلات إيدوها",
            },
            times: [
                {
                    day: { en: "Sun to Thu", ar: "من الأحد إلى الخميس" },
                    hours: { en: "8:00 AM - 5:00 PM", ar: "8:00 ص - 5:00 م" },
                },
                {
                    day: { en: "Sat", ar: "السبت" },
                    hours: { en: "8:00 AM - 2:00 PM", ar: "8:00 ص - 2:00 م" },
                },
                {
                    day: { en: "Fri", ar: "الجمعة" },
                    hours: { en: "CLOSED", ar: "مغلق" },
                },
            ],
        },
        {
            id: 2,
            title: {
                en: "Souq Waqif Kiosk",
                ar: "كشك سوق واقف",
            },
            times: [
                {
                    day: { en: "Daily", ar: "يوميًا" },
                    hours: { en: "10:00 AM - 5:00 PM", ar: "10:00 ص - 5:00 م" },
                },
            ],
        },
        {
            id: 3,
            title: {
                en: "National Museum Kiosk",
                ar: "كشك المتحف الوطني",
            },
            times: [
                {
                    day: { en: "Daily", ar: "يوميًا" },
                    hours: { en: "10:00 AM - 5:00 PM", ar: "10:00 ص - 5:00 م" },
                },
            ],
        },
        {
            id: 4,
            title: {
                en: "Sheraton Hotel Park Kiosk",
                ar: "كشك منتزه فندق شيراتون",
            },
            times: [
                {
                    day: { en: "Daily", ar: "يوميًا" },
                    hours: { en: "10:00 AM - 5:00 PM", ar: "10:00 ص - 5:00 م" },
                },
            ],
        },
        {
            id: 5,
            title: {
                en: "Katara Cultural Village Kiosk",
                ar: "كشك قرية كتارا الثقافية",
            },
            times: [
                {
                    day: { en: "Daily", ar: "يوميًا" },
                    hours: { en: "10:00 AM - 5:00 PM", ar: "10:00 ص - 5:00 م" },
                },
            ],
        },
        {
            id: 6,
            title: {
                en: "Sealine Kiosk",
                ar: "كشك سيلين",
            },
            times: [
                {
                    day: { en: "Daily", ar: "يوميًا" },
                    hours: { en: "9:00 AM - 5:00 PM", ar: "9:00 ص - 5:00 م" },
                },
            ],
        },
        {
            id: 7,
            title: {
                en: "Al Majles Resort",
                ar: "منتجع المجلس",
            },
            times: [
                {
                    day: {
                        en: "Saturday to Wednesday",
                        ar: "من السبت إلى الأربعاء",
                    },
                    hours: { en: "9:00 AM - 7:00 PM", ar: "9:00 ص - 7:00 م" },
                },
                {
                    day: { en: "Thursday & Friday", ar: "الخميس والجمعة" },
                    hours: {
                        en: "10:00 AM - 12:00 AM",
                        ar: "10:00 ص - 12:00 ص",
                    },
                },
            ],
        },
    ];
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
            faq: "Do you have doubts? F&Q",
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
                console.log(data.data.data.locations);
                setDatas(data.data.data.locations);
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
                title={"Contact"}
                subTitle={"Home | Contact"}
            />
            <div className="lg:w-[70%] lg:mx-auto p-10 md:px-20 flex gap-10 flex-col xl:flex-row">
                <div
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="w-full xl:w-2/3"
                >
                    <div className="w-full xl:w-2/3">
                        <h1 className="text-[2.8rem] font-bold text-dark">
                            {heading}
                        </h1>
                        <p className="text-gray">{paragraph}</p>

                        <form className="space-y-5 mt-10">
                            <div className="flex justify-center items-center gap-5 flex-col md:flex-row">
                                <input
                                    type="text"
                                    placeholder={placeholders.name}
                                    className="p-3 px-5 w-full outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                                />
                                <input
                                    type="text"
                                    placeholder={placeholders.email}
                                    className="p-3 w-full px-5 outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder={placeholders.subject}
                                className="p-3 w-full px-5 outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                            />

                            <textarea
                                placeholder={placeholders.message}
                                rows="5"
                                className="p-3 w-full px-5 outline-none border border-gray-lite rounded-3xl focus:border-custom-yellow"
                            />

                            <label className="block">
                                <input type="checkbox" /> &nbsp;{terms}{" "}
                                <span className="text-custom-yellow">
                                    {terms}
                                </span>
                            </label>
                            <button
                                type="button"
                                className="w-full py-2 bg-custom-yellow hover:bg-black hover:text-white duration-300 rounded-full"
                            >
                                {button}
                            </button>
                            <Link to={"/faq"}>
                                <p className="text-center text-lg mt-5">
                                    {faq}
                                </p>
                            </Link>
                        </form>
                    </div>
                </div>
                <div
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="w-full xl:w-1/3 space-y-5"
                >
                    <h2 className="text-3xl font-bold text-dark">
                        {lang === "en"
                            ? "Locations & Opening Times"
                            : "المواقع وأوقات العمل"}
                    </h2>
                    {datas?.map((location) => (
                        <div key={location.id}>
                            {console.log(location)}
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
                                        {time.time[lang]}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
