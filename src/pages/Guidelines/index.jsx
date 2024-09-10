import React from "react";
import Banner from "../../components/Banner";
import { useSelector } from "react-redux";
import contactImg from "../../assets/contact.jpg";

const index = () => {
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')

  // Object containing guidelines content for both English and Arabic
  const content = {
    en: {
      title: "Guidelines",
      subTitle: "Home | Guidelines",
      heading: "Read Guidelines",
      paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam minima id quae iure ratione pariatur sint molestias! Ea ut nulla corporis, facere explicabo officiis dolorem quos officia labore non.",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reprehenderit quod, voluptate sequi ullam odit molestias cumque, recusandae quisquam obcaecati unde hic, eos placeat dolore? Nihil itaque ducimus architecto odit consequatur quam molestiae quo eligendi saepe quas, tempore officia aliquid modi earum exercitationem eaque vero, eius odio error! Quidem aliquid ut quis non tempora aliquam, maiores animi quibusdam accusantium soluta neque ullam nostrum velit, dolore esse sint vitae minima veniam incidunt id.",
        "Natus similique atque voluptatem. Ad fugiat atque eligendi. Suscipit voluptatem, facere nesciunt, voluptas dicta ducimus accusamus quos laboriosam quisquam aliquam sed inventore rem. Fugiat numquam odio consectetur rem?",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut totam tempora debitis quos nihil ipsa eum at, porro sed expedita rerum temporibus, deserunt, quidem tempore assumenda? Quisquam iste quia ex.",
      ],
    },
    ar: {
      title: "إرشادات",
      subTitle: "الصفحة الرئيسية | إرشادات",
      heading: "اقرأ الإرشادات",
      paragraphs: [
        "نص عربي افتراضي للمحتوى المخصص للإرشادات. يمكنك لاحقًا إضافة النص العربي المناسب هنا. هذا النص هو مجرد نص تجريبي لإظهار كيفية دعم اللغات.",
        "نص عربي تجريبي آخر لوصف الإرشادات. يمكن استبدال هذا النص لاحقًا بنص عربي حقيقي يعبر عن الإرشادات التي تريد عرضها للمستخدم.",
        "نص تجريبي إضافي باللغة العربية. يمكن استخدام هذا المكان لوضع إرشادات مفصلة باللغة العربية لاحقًا.",
        "النص الأخير باللغة العربية لإرشادات المستخدم. يمكنك تعديل هذا النص لاحقًا بما يتناسب مع المحتوى الفعلي.",
      ],
    },
  };

  const selectedContent = content[lang]; // Select content based on language

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
          {selectedContent.paragraphs.map((paragraph, index) => (
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
