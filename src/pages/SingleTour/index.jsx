import React, { useState } from "react";
import Banner from "../../components/Banner";
import Reviews from "./Reviews";

import singleTour from "../../assets/single-tour.jpg";
import album1 from "../../assets/album1.jpg";
import album2 from "../../assets/album2.jpg";
import album3 from "../../assets/album3.jpg";
import album4 from "../../assets/album4.jpg";
import album5 from "../../assets/album5.jpg";
import album6 from "../../assets/album6.jpg";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux";
const SingleTour = () => {
    const lang = useSelector((state) => state.language.lang);
    const [selectedImage, setSelectedImage] = useState(null);
    const album = [album1, album2, album3, album4, album5, album6];
    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + album.length) % album.length
        );
    };

    const data = {
        image: singleTour,
        itinerary: {
            en: `Take a ride through the mighty dunes in the
                    exclusive off-road monster bus. This is an
                    experience you would never want to miss. We will
                    take you into the heart of the desert on the
                    massive 32-seater off-road Monster Bus where you
                    will take on the Qatari dunes and experience
                    desert hospitality.`,
            ar: `انطلق في جولة عبر الكثبان الرملية الشاهقة على متن حافلة monster bus ذات الدفع الرباعي. هذه تجربة لن ترغب في تفويتها. سنأخذك إلى قلب الصحراء على متن الحافلة العملاقة ذات الـ 32 مقعدًا حيث ستواجه الكثبان الرملية القطرية وتختبر ضيافة الصحراء.`,
        },
        highlights: {
            en: [
                "A serene drive from Doha to Sealine desert",
                "Take on the towering Qatari desert with the mighty Monster Bus perfect for adventurous individuals and groups",
                "Come across oryx’s at the Al Majles Resort",
                "Have a refreshing beverage as you take in the sea and desert views from Al Majles Resort",
            ],
            ar: [
                "جولة هادئة من الدوحة إلى صحراء سيلين",
                "مواجهة صحراء قطر الشاهقة على متن حافلة Monster Bus القوية، المثالية للأفراد والمجموعات المغامرة",
                "مقابلة المها في منتجع المجلس",
                "استمتع بمشروب منعش وأنت تستمتع بإطلالات البحر والصحراء من منتجع المجلس",
            ],
        },
        timings: {
            en: [
                `AM tour: 9:00AM - 12:00NN | PM tour: 2:00PM - 5:00PM`,
                `We recommend afternoon tours during the summer season`,
            ],
            ar: [
                `جولة الصباح: 9:00 صباحًا - 12:00 ظهرًا | جولة المساء: 2:00 ظهرًا - 5:00 مساءً`,
                `نوصي بالجولات بعد الظهر خلال فصل الصيف`,
            ],
        },
        included: {
            ar: [
                `النقل من وإلى موقعك ضمن حدود مدينة الدوحة`,
                `جولة صحراوية على متن حافلة Monster Bus ذات الدفع الرباعي مع سائقنا المتمرس`,
                `توقف سريع في منتجع المجلس لفرص التصوير`,
                `فرصة لالتقاط صور مع المها`,
                `مشروب منعش`,
            ],
            en: [
                `Pick up and drop off from your location within Doha city limits`,
                `Off-road desert drive through the sand dunes on the Monster Bus with our experienced driver`,
                `Quick stop at Al Majles Resort for photo opportunities`,
                `Photo opportunity with Oryx`,
                `Refreshing beverage`,
            ],
        },
        importantInformations: {
            en: [
                `Bring sunblock, sunglasses, cap/hat and wear comfortable light clothing.`,
                `Tour is on sharing basis and non-guided.`,
                `Camel riding can be purchased at your stop in Al Majles Resort.`,
            ],
            ar: [
                `احضر واقي الشمس، نظارات شمسية، قبعة/قبعة وارتدِ ملابس خفيفة ومريحة.`,
                `الجولة على أساس المشاركة وغير موجهة.`,
                `يمكن شراء ركوب الجمال في محطتك في منتجع المجلس.`,
            ],
        },
        cancellationpolicy: {
            en: [
                `7 days – 72 hours prior to service date: No cancellation fee`,
                `72 hours – 24 hours prior to service date: 50% cancellation fee, 50% refund.`,
                `Less than 24 hours prior to service date: 100% cancellation fee, no refund`,
            ],
            ar: [
                `7 أيام - 72 ساعة قبل تاريخ الخدمة: لا توجد رسوم إلغاء`,
                `72 ساعة - 24 ساعة قبل تاريخ الخدمة: رسوم إلغاء 50%، واسترداد 50%.`,
                `أقل من 24 ساعة قبل تاريخ الخدمة: رسوم إلغاء 100%، ولا يوجد استرداد`,
            ],
        },
    };
    const tableData = {
        headers: {
            en: ["No of Pax", "1", "2", "3", "4-6", "7-9", "10 & More"],
            ar: ["عدد الركاب", "1", "2", "3", "4-6", "7-9", "10 أو أكثر"],
        },
        rows: [
            {
                label: {
                    en: "Price per Adult (12 yrs+)",
                    ar: "السعر لكل بالغ (12 سنة+)",
                },
                prices: [
                    "QAR 1,024",
                    "QAR 621",
                    "QAR 506",
                    "QAR 449",
                    "QAR 391",
                    "QAR 334",
                ],
            },
            {
                label: {
                    en: "Price per Child (3-11 yrs)",
                    ar: "السعر لكل طفل (3-11 سنة)",
                },
                prices: [
                    "QAR 1,024",
                    "QAR 621",
                    "QAR 506",
                    "QAR 449",
                    "QAR 391",
                    "QAR 334",
                ],
            },
        ],
    };

    return (
        <div>
            <Banner
                image={singleTour}
                title={"Monster Bus Tour in the Desert"}
                subTitle={"Home | Tours"}
            />
            <div
                className="xl:w-[70%] mx-auto"
                dir={lang === "ar" ? "rtl" : "ltr"}
            >
                <div className="mt-10 p-10  flex gap-5  flex-col lg:flex-row space-y-3">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                {lang === "en" ? "Itinerary" : "مسار الرحلة"}
                            </h2>
                            <p className="text-gray leading-7">
                                {data.itinerary[lang]}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl text-custom-yellow ">
                                {lang === "en"
                                    ? "Tour Highlights"
                                    : "أهم معالم الجولة"}
                            </h2>
                            <ul className="text-gray pl-5 list-disc leading-7">
                                {data.highlights[lang].map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                {lang === "en" ? "Timings" : "المواعيد"}
                            </h2>
                            <ul className="text-gray pl-5   leading-7">
                                {data.timings[lang].map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                            {/* <p className="text-gray leading-7">
                                AM tour: 9:00AM - 12:00NN | PM tour: 2:00PM -
                                5:00PM
                                <br />
                                We recommend afternoon tours during the summer
                                season.
                            </p> */}
                        </div>
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                {lang === "en"
                                    ? "What's Included?"
                                    : "ما الذي يتضمنه؟"}
                            </h2>

                            <ul className="text-gray pl-5 list-disc leading-7">
                                {data.included[lang].map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mx-10 md:mx-20">
                    {/* Default Table for Large Screens */}
                    <table className="hidden lg:table w-full">
                        <thead>
                            <tr className="bg-custom-yellow">
                                {tableData.headers[lang].map(
                                    (header, index) => (
                                        <th
                                            key={index}
                                            className={index === 0 ? "p-5" : ""}
                                        >
                                            {header}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="text-center text-gray-dark bg-gray-100"
                                >
                                    <td className="font-bold p-5">
                                        {row.label[lang]}
                                    </td>
                                    {row.prices.map((price, priceIndex) => (
                                        <td key={priceIndex} className="p-10">
                                            {price}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="lg:hidden">
                        <div className="space-y-4">
                            {tableData.rows.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="bg-gray-200 p-4 rounded-md"
                                >
                                    <h3 className="font-bold text-lg">
                                        {row.label[lang]}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {tableData.headers[lang]
                                            .slice(1)
                                            .map((header, headerIndex) => (
                                                <div
                                                    key={headerIndex}
                                                    className="flex justify-between"
                                                >
                                                    <span>{header}</span>
                                                    <span>
                                                        {
                                                            row.prices[
                                                                headerIndex
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mx-10 mt-10 ">
                    <div>
                        <h2 className="text-2xl text-custom-yellow ">
                            {lang === "en"
                                ? "Important Information"
                                : "معلومات هامة"}
                        </h2>
                        <ul className="text-gray pl-5 list-disc leading-7">
                            {data.importantInformations[lang].map((item) => (
                                <li>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <br />
                    <div>
                        <h2 className="text-2xl text-custom-yellow">
                            {lang === "en"
                                ? "Cancellation Policy"
                                : "سياسة الإلغاء"}
                        </h2>
                        <p className="text-gray py-5">
                            {lang === "en"
                                ? ` A strict cancellation fee will be applicable to
                            compensate for costs and lost revenue. Once a
                            booking is made the following cancellation fees will
                            apply:`
                                : ` ستُطبق رسوم إلغاء صارمة لتعويض التكاليف والإيرادات المفقودة. بمجرد إجراء الحجز، سيتم تطبيق رسوم الإلغاء التالية:`}
                        </p>
                        <ul className="text-gray pl-5 list-disc leading-7">
                            {data.cancellationpolicy[lang].map((item) => (
                                <li>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex gap-5 justify-center items-center p-5 flex-wrap">
                    <button className="bg-dark py-3 px-5 rounded-md hover:bg-custom-yellow text-white hover:text-black duration-300 flex justify-center items-center gap-2">
                        <BiCart className="text-2xl" />
                        {lang === "en" ? "Add to Cart" : "أضف إلى السلة"}
                    </button>

                    <button className="bg-custom-yellow py-3 px-5 rounded-md hover:bg-dark hover:text-white duration-300">
                        {lang === "en" ? "Book Now" : "احجز الآن"}
                    </button>
                </div>{" "}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-5 flex-wrap justify-center items-center">
                        {album.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index}`}
                                className="object-cover w-[150px] h-[150px] cursor-pointer hover:scale-110 duration-300 rounded-md"
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </div>
                {/* <Reviews /> */}
                <div
                    className={`fixed inset-0   flex justify-center items-center transition-opacity duration-300 ${
                        selectedImage !== null ? "z-10" : "-z-10 opacity-0"
                    }`}
                >
                    <div
                        className={`fixed inset-0 bg-black  transition-opacity duration-300 ${
                            selectedImage !== null
                                ? "opacity-70"
                                : "-z-10 opacity-0"
                        }`}
                    >
                        {" "}
                    </div>
                    <div>
                        {" "}
                        {selectedImage !== null && (
                            <div className="relative w-[80vw] max-w-[800px] h-[80vh]">
                                <IoClose
                                    className="w-10 h-10 text-white cursor-pointer absolute -right-10 -top-10 p-2"
                                    onClick={() => setSelectedImage(null)}
                                />
                                <img
                                    src={album[selectedImage]}
                                    alt={`Selected ${selectedImage}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute -left-12 top-1/2 transform -translate-y-1/2 p-2 text-white"
                                    onClick={handlePreviousImage}
                                >
                                    <IoArrowBack className="w-8 h-8" />
                                </button>
                                <button
                                    className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 text-white"
                                    onClick={handleNextImage}
                                >
                                    <IoArrowForward className="w-8 h-8" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTour;
