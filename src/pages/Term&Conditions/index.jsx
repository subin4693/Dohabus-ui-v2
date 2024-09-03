import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div>
      <div className="p-8 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to DohaBuss! These terms and conditions outline the rules and
          regulations for the use of DohaBuss's website, located at
          https://dohabus.com.
        </p>

        <p className="mb-4">
          By accessing this website and booking tours with us, you agree to
          comply with these terms and conditions. If you do not agree with any
          part of these terms, you should not continue to use our website or
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tour Booking</h2>
        <p className="mb-4">
          All bookings made on the DohaBuss website are subject to availability.
          We reserve the right to cancel or modify your booking in the event of
          unforeseen circumstances, such as weather conditions or operational
          issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Payment and Cancellation
        </h2>
        <p className="mb-4">
          Payments for tours must be made in full at the time of booking.
          Cancellations made within 48 hours of the tour departure time will not
          be eligible for a refund. Please refer to our cancellation policy for
          more details.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Conduct During Tours
        </h2>
        <p className="mb-4">
          Participants are expected to behave respectfully and adhere to the
          instructions of the tour guide. DohaBuss reserves the right to remove
          any participant from a tour if their behavior is deemed inappropriate
          or disruptive.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Liability</h2>
        <p className="mb-4">
          DohaBuss is not liable for any injuries, damages, or losses that occur
          during the tour, except where such incidents are caused by the
          negligence of our staff.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Intellectual Property
        </h2>
        <p className="mb-4">
          All content, including images, text, and logos on this website, is the
          property of DohaBuss and is protected by intellectual property laws.
          Unauthorized use of our content is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy</h2>
        <p className="mb-4">
          We are committed to protecting your privacy. Please review our Privacy
          Policy to understand how we collect, use, and safeguard your personal
          information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
        <p className="mb-4">
          DohaBuss reserves the right to update these terms and conditions at
          any time. Any changes will be posted on this page, and your continued
          use of our services constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these terms and conditions, please
          <Link to={"/contact"} className="text-custom-yellow">
            {" "}
            contact us.{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default index;
