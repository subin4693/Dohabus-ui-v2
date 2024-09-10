import React from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Faq = () => {
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')
  const data = [
    {
      question:
        lang === "ar" ? "كيف تعمل الفواتير؟" : "How does the billing work?",
      answer:
        lang === "ar"
          ? "تقدم Springerdata مجموعة متنوعة من خيارات الفوترة، بما في ذلك خطط الاشتراك الشهرية والسنوية، بالإضافة إلى التسعير حسب الاستخدام لبعض الخدمات."
          : "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services.",
    },
    {
      question:
        lang === "ar" ? "ما هي سياسة الاسترداد؟" : "What is the refund policy?",
      answer:
        lang === "ar"
          ? "نحن نقدم ضمان استرداد الأموال لمدة 30 يومًا على جميع خدماتنا. إذا لم تكن راضيًا، يمكنك طلب استرداد الأموال في غضون 30 يومًا من الشراء."
          : "We offer a 30-day money-back guarantee on all our services. If you're not satisfied, you can request a refund within 30 days of purchase.",
    },
    {
      question:
        lang === "ar"
          ? "كيف يمكنني الاتصال بالدعم؟"
          : "How can I contact support?",
      answer:
        lang === "ar"
          ? "يمكنك التواصل مع فريق الدعم عبر البريد الإلكتروني على support@example.com أو من خلال نموذج الاتصال على الموقع."
          : "You can reach our support team via email at support@example.com or through our contact form on the website.",
    },
  ];

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
        subTitle={
          lang === "ar" ? "الصفحة الرئيسية | الأسئلة الشائعة" : "Home | FAQ"
        }
      />

      <div className="p-6">
        <div className="mx-auto mt-8 max-w-4xl divide-y divide-neutral-200 mb-5 border p-10 border-4 rounded-2xl">
          {data.map((item, index) => (
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
                  <span>{item.question}</span>
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
                  {item.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 textbase mt-9">
          {lang === "ar" ? "لا تزال لديك أسئلة؟" : "Still have questions?"}
          <Link
            to="/contact"
            className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline"
          >
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Faq;
