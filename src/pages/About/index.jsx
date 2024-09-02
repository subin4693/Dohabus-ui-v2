import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import AboutCard from "../../assets/aboutcard.jpg";
import { IoIosArrowDown } from "react-icons/io";
import catTop from "../../assets/city-tour-categorypage.jpg";
import about1 from "../../assets/about-md-1.png";
import about2 from "../../assets/about-md-2.png";
import about3 from "../../assets/about-md-3.png";
import ticket from "../../assets/travelaward-about.jpeg";
import { useSelector } from "react-redux";

const About = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [open, setOpen] = useState(null);
    const [data, setData] = useState({});
    const lang = useSelector((state) => state.language.lang);

    const handleOpen = (val) => {
        setOpen((prev) => {
            return prev === val ? null : val;
        });
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(BASE_URL + "/about");
                console.log(data);
                setData(data.data.aboutus[0]);
            } catch (error) {
                console.log(error);
            }
            // setAlbum(data?.data?.images);
            // setTours(data.data.data.plans);
        };
        getData();
    }, []);
    return (
        <div>
            <Banner
                image={catTop}
                title={lang === "en" ? "About" : "حول"}
                subTitle={lang === "en" ? "Home | About" : "الرئيسية | حول"}
            />
            <div
                className={`lg:w-[100%] mx-auto my-20 px-5 ${
                    lang === "ar" ? "text-right" : "text-left"
                }`}
            >
                <div
                    className={`flex flex-wrap justify-center gap-5 ${
                        lang === "ar" ? "flex-row-reverse" : ""
                    }`}
                >
                    <div className="w-[70vh]">
                        <img
                            src={data?.image && data?.image}
                            className="w-full h-full object-cover"
                            alt="About"
                        />
                    </div>
                    <div
                        className="w-[75vh] pb-5"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                    >
                        <p className="text-justify">
                            {data?.text && data?.text[lang]}

                            {/*{lang === "en"
                ? "Doha Bus is a privately owned company, whose primary goal is to provide a professional and courteous Hop on Hop off sightseeing tour to visitors of Doha. We have evolved rapidly and now offer a wide variety of exciting transportation services to the tourism, hospitality, and sight-seeing markets. Our company was established through the Doha Bus Hop on Hop Off Tour where a passenger may leave the bus to explore the city and spend time experiencing what each place has to offer. The passenger can then return to the bus with ease to continue on the exciting journey to a new thrilling destination in Doha."
                : "شركة دوحة باص هي شركة مملوكة بشكل خاص، وهدفها الأساسي هو تقديم جولة مشاهدة معالم المدينة بطريقة مهنية ومهذبة للسياح في الدوحة. لقد تطورنا بسرعة ونقدم الآن مجموعة متنوعة من خدمات النقل المثيرة لأسواق السياحة والضيافة ومشاهدة المعالم. تم إنشاء شركتنا من خلال جولة دوحة باص هوب أون هوب أوف حيث يمكن للراكب النزول من الحافلة لاستكشاف المدينة وقضاء وقت لتجربة ما يقدمه كل مكان. يمكن للراكب بعد ذلك العودة إلى الحافلة بسهولة لمواصلة الرحلة المثيرة إلى وجهة جديدة مثيرة في الدوحة."}*/}
                        </p>
                        <div className="text-gray-700">
                            <div
                                className={`flex justify-between items-center mt-5 text-2xl font-bold p-2 ${
                                    lang === "ar" ? "flex-row-reverse" : ""
                                }`}
                            >
                                <h1>
                                    {lang === "en" ? "Our Mission" : "مهمتنا"}
                                </h1>
                            </div>
                            <div className="">
                                <p className="p-5 bg-white">
                                    {data?.mission && data?.mission[lang]}
                                    {/*{lang === "en"
                    ? "Doha Bus is a well-established Destination Management Company that specializes in providing an extensive range of tours in and around Qatar. Our mission is to deliver elevated services, customized and tailor-made solutions backed by in-depth destination knowledge."
                    : "دوحة باص هي شركة رائدة في إدارة الوجهات، وهي متخصصة في تقديم مجموعة واسعة من الجولات داخل قطر وحولها. مهمتنا هي تقديم خدمات عالية الجودة وحلول مخصصة ومصممة خصيصًا مدعومة بمعرفة عميقة بالوجهة."}*/}
                                </p>
                            </div>
                            <br />
                            <div
                                className={`flex justify-between items-center font-bold p-2 text-2xl ${
                                    lang === "ar" ? "flex-row-reverse" : ""
                                }`}
                            >
                                <h1>
                                    {lang === "en" ? "Our Vision" : "رؤيتنا"}
                                </h1>
                            </div>
                            <div className="">
                                <p className="p-5 bg-white ">
                                    {data?.vision && data?.vision[lang]}
                                    {/*{lang === "en"
                    ? "It is our vision to expand brand visibility globally and to become the most trusted and preferred brand for individuals and partners. We want to enhance every visitor’s travel by creating significant and immersive experiences that leave a positive impact."
                    : "رؤيتنا هي توسيع رؤية العلامة التجارية على المستوى العالمي وأن نصبح العلامة التجارية الأكثر ثقة وتفضيلًا للأفراد والشركاء. نريد تعزيز كل رحلة زائر من خلال إنشاء تجارب مهمة وغامرة تترك تأثيرًا إيجابيًا."}*/}
                                </p>
                            </div>
                            {/*<button className="p-3 mt-3 text-dark font-semibold bg-custom-yellow rounded hover:bg-dark hover:text-white hover:shadow-lg transition-all duration-300">
                Change Profile
              </button>*/}
                        </div>
                    </div>
                </div>
                {/* <div className="flex justify-center items-center gap-10 flex-wrap mt-10">
                    {[about1, about2, about3].map((about, index) => (
                        <img
                            key={index}
                            src={about}
                            className="w-[200px] h-[250px] object-contain"
                            alt={`About ${index + 1}`}
                        />
                    ))}
                </div>
                <div>
                    <img src={ticket} alt="Ticket" />
                </div> */}
            </div>
        </div>
    );
};

export default About;
