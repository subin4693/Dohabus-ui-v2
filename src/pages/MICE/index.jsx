import React from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import img from "../../assets/single-tour.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
  const lang = useSelector((state) => state.language.lang);

  return (
    <div>
      <Banner
        image={contactImg}
        title={lang === "en" ? "MICE" : "MICE"}
        subTitle={lang === "en" ? "Home | MICE" : "الرئيسية | MICE"}
      />

      <div className="p-8 max-w-6xl mx-auto">
        <img src={img} alt="Tour" />
        <h1
          className={`text-4xl font-bold mb-6 text-center mt-5 ${
            lang === "ar" ? "text-end" : ""
          }`}
        >
          {lang === "en" ? "MICE Services" : "خدمات MICE"}
        </h1>
        <p className={`mb-8 text-lg ${lang === "ar" ? "text-end" : ""}`}>
          {lang === "en"
            ? "Transform your corporate events into unforgettable experiences with DohaBus. We specialize in Meetings, Incentives, Conferences, and Exhibitions (MICE) services in the vibrant city of Doha."
            : "حوّل فعالياتك corporate إلى تجارب لا تُنسى مع DohaBus. نحن متخصصون في خدمات الاجتماعات والحوافز والمؤتمرات والمعارض (MICE) في مدينة الدوحة النابضة بالحياة."}
        </p>

        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Meetings" : "الاجتماعات"}
          </h2>
          <p className={`mb-4 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en"
              ? "Whether you're planning a small business meeting or a large corporate gathering, DohaBus offers a range of venues and services to suit your needs. From boardrooms to large conference halls, we provide state-of-the-art facilities, professional staff, and comprehensive support to ensure your meeting is a success."
              : "سواء كنت تخطط لاجتماع عمل صغير أو تجمع كبير للشركة، توفر DohaBus مجموعة من الأماكن والخدمات التي تناسب احتياجاتك. من قاعات الاجتماعات الصغيرة إلى قاعات المؤتمرات الكبيرة، نقدم مرافق حديثة، وفريق عمل محترف، ودعماً شاملاً لضمان نجاح اجتماعك."}
          </p>
        </section>

        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Incentives" : "الحوافز"}
          </h2>
          <p className={`mb-4 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en"
              ? "Reward your team with an incentive trip they’ll never forget. Doha’s rich culture, stunning landscapes, and luxury experiences make it the perfect destination for incentive travel. We create tailored programs that motivate and inspire, from desert safaris to exclusive experiences in the city."
              : "كافئ فريقك برحلة حوافز لن ينسوها أبداً. تجعل ثقافة الدوحة الغنية، المناظر الطبيعية الخلابة، والتجارب الفاخرة منها الوجهة المثالية لرحلات الحوافز. نحن نبتكر برامج مخصصة تحفز وتلهم، من رحلات السفاري في الصحراء إلى التجارب الحصرية في المدينة."}
          </p>
        </section>

        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Conferences" : "المؤتمرات"}
          </h2>
          <p className={`mb-4 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en"
              ? "DohaBus excels in organizing conferences of all sizes. We offer full conference management services, including venue selection, technical support, catering, and logistics. Our team ensures that every detail is handled, allowing you to focus on delivering your message and engaging with your audience."
              : "تتألق DohaBus في تنظيم المؤتمرات بمختلف الأحجام. نحن نقدم خدمات إدارة المؤتمرات الكاملة، بما في ذلك اختيار الأماكن، الدعم الفني، خدمات الطعام، واللوجستيات. يتأكد فريقنا من أن كل التفاصيل تتم معالجتها، مما يسمح لك بالتركيز على توصيل رسالتك والتفاعل مع جمهورك."}
          </p>
        </section>

        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Exhibitions" : "المعارض"}
          </h2>
          <p className={`mb-4 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en"
              ? "Make your exhibition stand out with DohaBus. We provide comprehensive exhibition services, from booth design and setup to marketing and attendee management. Our expertise in event logistics ensures that your exhibition is smoothly executed, creating a lasting impression on all attendees."
              : "اجعل معرضك يتألق مع DohaBus. نحن نقدم خدمات شاملة للمعارض، من تصميم وتركيب الأكشاك إلى التسويق وإدارة الحضور. خبرتنا في لوجستيات الفعاليات تضمن تنفيذ معرضك بسلاسة، مما يخلق انطباعاً دائماً لدى جميع الحضور."}
          </p>
        </section>

        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Why Choose DohaBus?" : "لماذا تختار DohaBus؟"}
          </h2>
          <ul className={`list-disc ml-6 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en" ? (
              <>
                <li>Expert knowledge of Doha’s best venues and attractions</li>
                <li>Comprehensive event planning and management services</li>
                <li>Personalized and customizable MICE packages</li>
                <li>
                  Experienced team dedicated to making your event a success
                </li>
              </>
            ) : (
              <>
                <li>المعرفة الخبيرة بأفضل الأماكن والمعالم في الدوحة</li>
                <li>خدمات تخطيط وإدارة الفعاليات الشاملة</li>
                <li>حزم MICE مخصصة وقابلة للتخصيص</li>
                <li>فريق ذو خبرة مكرس لضمان نجاح فعاليتك</li>
              </>
            )}
          </ul>
        </section>

        <section className="text-center mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              lang === "ar" ? "text-end" : ""
            }`}
          >
            {lang === "en" ? "Get in Touch" : "تواصل معنا"}
          </h2>
          <p className={`mb-4 ${lang === "ar" ? "text-end" : ""}`}>
            {lang === "en"
              ? "Ready to plan your next corporate event in Doha? Contact us today to discuss your requirements and discover how DohaBus can help you create an unforgettable experience."
              : "هل أنت مستعد لتخطيط فعاليتك التالية للشركات في الدوحة؟ اتصل بنا اليوم لمناقشة متطلباتك واكتشاف كيف يمكن لـ DohaBus مساعدتك في إنشاء تجربة لا تُنسى."}
          </p>
          <Link to="/contact">
            <button
              className={`text-lg font-semibold rounded p-3 ${
                lang === "ar" ? "ml-auto" : "mr-auto"
              } bg-custom-yellow text-white hover:bg-dark`}
            >
              {lang === "en" ? "Contact Us" : "اتصل بنا"}
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Index;
