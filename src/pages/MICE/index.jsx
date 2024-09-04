import React from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <div>
      <Banner image={contactImg} title={"MICE"} subTitle={"Home | MICE"} />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">MICE Services</h1>
        <p className="mb-8 text-lg text-center">
          Transform your corporate events into unforgettable experiences with
          DohaBuss. We specialize in Meetings, Incentives, Conferences, and
          Exhibitions (MICE) services in the vibrant city of Doha.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Meetings</h2>
          <p className="mb-4">
            Whether you're planning a small business meeting or a large
            corporate gathering, DohaBuss offers a range of venues and services
            to suit your needs. From boardrooms to large conference halls, we
            provide state-of-the-art facilities, professional staff, and
            comprehensive support to ensure your meeting is a success.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Incentives</h2>
          <p className="mb-4">
            Reward your team with an incentive trip they’ll never forget. Doha’s
            rich culture, stunning landscapes, and luxury experiences make it
            the perfect destination for incentive travel. We create tailored
            programs that motivate and inspire, from desert safaris to exclusive
            experiences in the city.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Conferences</h2>
          <p className="mb-4">
            DohaBuss excels in organizing conferences of all sizes. We offer
            full conference management services, including venue selection,
            technical support, catering, and logistics. Our team ensures that
            every detail is handled, allowing you to focus on delivering your
            message and engaging with your audience.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Exhibitions</h2>
          <p className="mb-4">
            Make your exhibition stand out with DohaBuss. We provide
            comprehensive exhibition services, from booth design and setup to
            marketing and attendee management. Our expertise in event logistics
            ensures that your exhibition is smoothly executed, creating a
            lasting impression on all attendees.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why Choose DohaBuss?</h2>
          <ul className="list-disc ml-8 mb-4">
            <li>Expert knowledge of Doha’s best venues and attractions</li>
            <li>Comprehensive event planning and management services</li>
            <li>Personalized and customizable MICE packages</li>
            <li>Experienced team dedicated to making your event a success</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Ready to plan your next corporate event in Doha? Contact us today to
            discuss your requirements and discover how DohaBuss can help you
            create an unforgettable experience.
          </p>
          <Link to={"/contact"}>
            <button className="text-lg font-semibold rounded p-3 bg-custom-yellow text-white hover:bg-dark">
              Contact Us.
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default index;
