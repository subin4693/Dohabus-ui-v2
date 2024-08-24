import React from "react";
import Banner from "../../components/Banner";
import Card from "./Card";
import banner from "../../assets/hotel-banner.jpg";
import hotel1 from "../../assets/hotel1.jpg";
import { useSelector } from "react-redux";

const Hotel = () => {
    const lang = useSelector((state) => state.language.lang);

    const tempHotels = [
        {
            _id: "231",
            image: hotel1,
            title: {
                en: "Grand Hyatt Doha Hotel & Villas",
                ar: "فندق وفلل جراند حياة الدوحة",
            },
            description: {
                en: "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach.",
                ar: "فندق فاخر من فئة الخمس نجوم يضم فيلات فخمة يقع على طول شاطئ ويست باي لاجون ذو المناظر الخلابة، ويمتد على مساحة تزيد عن 150,000 متر مربع، ويعرض مزيجًا من الهندسة المعمارية العربية الرائعة، والحدائق الخضراء، والعديد من حمامات السباحة، وشاطئ خاص بطول 400 متر.",
            },
        },
        {
            _id: "2t31",
            image: hotel1,
            title: {
                en: "Grand Hyatt Doha Hotel & Villas",
                ar: "فندق وفلل جراند حياة الدوحة",
            },
            description: {
                en: "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach.",
                ar: "فندق فاخر من فئة الخمس نجوم يضم فيلات فخمة يقع على طول شاطئ ويست باي لاجون ذو المناظر الخلابة، ويمتد على مساحة تزيد عن 150,000 متر مربع، ويعرض مزيجًا من الهندسة المعمارية العربية الرائعة، والحدائق الخضراء، والعديد من حمامات السباحة، وشاطئ خاص بطول 400 متر.",
            },
        },
        {
            _id: "2w31",
            image: hotel1,
            title: {
                en: "Grand Hyatt Doha Hotel & Villas",
                ar: "فندق وفلل جراند حياة الدوحة",
            },
            description: {
                en: "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach.",
                ar: "فندق فاخر من فئة الخمس نجوم يضم فيلات فخمة يقع على طول شاطئ ويست باي لاجون ذو المناظر الخلابة، ويمتد على مساحة تزيد عن 150,000 متر مربع، ويعرض مزيجًا من الهندسة المعمارية العربية الرائعة، والحدائق الخضراء، والعديد من حمامات السباحة، وشاطئ خاص بطول 400 متر.",
            },
        },
        {
            _id: "23d1",
            image: hotel1,
            title: {
                en: "Grand Hyatt Doha Hotel & Villas",
                ar: "فندق وفلل جراند حياة الدوحة",
            },
            description: {
                en: "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach.",
                ar: "فندق فاخر من فئة الخمس نجوم يضم فيلات فخمة يقع على طول شاطئ ويست باي لاجون ذو المناظر الخلابة، ويمتد على مساحة تزيد عن 150,000 متر مربع، ويعرض مزيجًا من الهندسة المعمارية العربية الرائعة، والحدائق الخضراء، والعديد من حمامات السباحة، وشاطئ خاص بطول 400 متر.",
            },
        },
    ];

    return (
        <div>
            <Banner
                image={banner}
                title={lang === "en" ? "Hotels" : "الفنادق"}
                subTitle={
                    lang === "en" ? "Home | Hotels" : "الرئيسية | الفنادق"
                }
            />
            <div className="px-1 md:px-10 xl:w-[70%] mx-auto my-10">
                <div className="grid grid-cols-1 gap-y-20 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {tempHotels.map((hotel) => (
                        <Card
                            lang={lang}
                            image={hotel.image}
                            title={hotel.title[lang]} // Use language-specific title
                            desc={hotel.description[lang]} // Use language-specific description
                            key={hotel._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hotel;
