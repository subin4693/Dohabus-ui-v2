import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const index = () => {
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')
  return (
    <div style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      <div className="p-8 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-6">
          {lang === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}
        </h1>

        <p className="mb-4">
          {lang === "ar"
            ? "مرحبًا بكم في DohaBus! توضح هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام موقع DohaBus الإلكتروني، الموجود على https://dohabus.com."
            : "Welcome to DohaBus! These terms and conditions outline the rules and regulations for the use of DohaBus's website, located at https://dohabus.com."}
        </p>

        <p className="mb-4">
          {lang === "ar"
            ? "من خلال الوصول إلى هذا الموقع وحجز الجولات معنا، فإنك توافق على الامتثال لهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك التوقف عن استخدام موقعنا أو خدماتنا."
            : "By accessing this website and booking tours with us, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, you should not continue to use our website or services."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "حجز الجولة" : "Tour Booking"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "جميع الحجوزات التي تتم على موقع DohaBus الإلكتروني تخضع للتوافر. نحتفظ بالحق في إلغاء أو تعديل حجزك في حالة حدوث ظروف غير متوقعة، مثل الأحوال الجوية أو المشكلات التشغيلية."
            : "All bookings made on the DohaBus website are subject to availability. We reserve the right to cancel or modify your booking in the event of unforeseen circumstances, such as weather conditions or operational issues."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "الدفع والإلغاء" : "Payment and Cancellation"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "يجب دفع تكلفة الجولات بالكامل وقت الحجز. الإلغاءات التي تتم في غضون 48 ساعة من موعد مغادرة الجولة لن تكون مؤهلة لاسترداد الأموال. يرجى الرجوع إلى سياسة الإلغاء الخاصة بنا للحصول على مزيد من التفاصيل."
            : "Payments for tours must be made in full at the time of booking. Cancellations made within 48 hours of the tour departure time will not be eligible for a refund. Please refer to our cancellation policy for more details."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "السلوك أثناء الجولات" : "Conduct During Tours"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "يتوقع من المشاركين التصرف باحترام والالتزام بتعليمات مرشد الجولة. تحتفظ DohaBus بالحق في إزالة أي مشارك من الجولة إذا كان سلوكه غير لائق أو مسببًا للإزعاج."
            : "Participants are expected to behave respectfully and adhere to the instructions of the tour guide. DohaBus reserves the right to remove any participant from a tour if their behavior is deemed inappropriate or disruptive."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "المسؤولية" : "Liability"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "DohaBus ليست مسؤولة عن أي إصابات أو أضرار أو خسائر تحدث أثناء الجولة، باستثناء الحالات التي تكون فيها مثل هذه الحوادث ناجمة عن إهمال موظفينا."
            : "DohaBus is not liable for any injuries, damages, or losses that occur during the tour, except where such incidents are caused by the negligence of our staff."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "حقوق الملكية الفكرية" : "Intellectual Property"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "جميع المحتويات، بما في ذلك الصور والنصوص والشعارات الموجودة على هذا الموقع، هي ملكية خاصة بـ DohaBus ومحمية بموجب قوانين الملكية الفكرية. يُمنع الاستخدام غير المصرح به لمحتوياتنا."
            : "All content, including images, text, and logos on this website, is the property of DohaBus and is protected by intellectual property laws. Unauthorized use of our content is prohibited."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "الخصوصية" : "Privacy"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "نحن ملتزمون بحماية خصوصيتك. يرجى مراجعة سياسة الخصوصية الخاصة بنا لفهم كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية."
            : "We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and safeguard your personal information."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "التغييرات على الشروط" : "Changes to Terms"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "تحتفظ DohaBus بالحق في تحديث هذه الشروط والأحكام في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة، ويشكل استمرار استخدامك لخدماتنا قبولًا للشروط المحدثة."
            : "DohaBus reserves the right to update these terms and conditions at any time. Any changes will be posted on this page, and your continued use of our services constitutes acceptance of the updated terms."}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          {lang === "ar" ? "اتصل بنا" : "Contact Us"}
        </h2>
        <p className="mb-4">
          {lang === "ar"
            ? "إذا كانت لديك أي أسئلة حول هذه الشروط والأحكام، يرجى"
            : "If you have any questions about these terms and conditions, please"}
          <Link to={"/contact"} className="text-custom-yellow">
            {lang === "ar" ? " اتصل بنا. " : " contact us. "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default index;
