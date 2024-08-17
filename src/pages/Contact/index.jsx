import React from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { FaMapPin } from "react-icons/fa";
const Contact = () => {
    return (
        <div>
            <Banner
                image={contactImg}
                title={"Contact"}
                subTitle={"Home | Contact"}
            />
            <div className="lg:w-[70%] lg:mx-auto p-10 md:px-20 flex gap-10 flex-col xl:flex-row">
                <div className="w-full xl:w-2/3   ">
                    <h1 className="text-[2.8rem] font-bold text-dark">
                        How can we help?
                    </h1>
                    <p classname="text-gray">
                        We’ll help you find the right places and ways to get the
                        most out of your visit to Qatar! Tell us a bit about
                        yourself, and we’ll get in touch as soon as we can.
                    </p>

                    <form className="space-y-5 mt-10">
                        <div className="flex justify-center items-center gap-5 flex-col md:flex-row">
                            <input
                                type="text"
                                placeholder="Name"
                                className="p-3 px-5 w-full outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                            />

                            <input
                                type="text"
                                placeholder="email"
                                className="p-3 w-full px-5  outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Subject"
                            className="p-3 w-full px-5  outline-none border border-gray-lite rounded-full focus:border-custom-yellow"
                        />

                        <textarea
                            placeholder="message"
                            rows="5"
                            className="p-3 w-full px-5  outline-none border border-gray-lite rounded-3xl focus:border-custom-yellow "
                        />

                        <label className="block ">
                            <input type="checkbox" /> &nbsp;I agree with your{" "}
                            <span className="text-custom-yellow">
                                terms & conditions.
                            </span>
                        </label>
                        <button
                            type="button"
                            className="w-full py-2 bg-custom-yellow hover:bg-black hover:text-white duration-300 rounded-full "
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                <div className="w-full  xl:w-1/3 space-y-5">
                    <h2 className="text-3xl font-bold text-dark">
                        Locations & Opening Times
                    </h2>
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            IDoha Bus Head Office
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">
                            Sun to Thu :{" "}
                        </span>
                        8:00 AM - 5:00 PM
                        <br />
                        <span className="text-gray font-bold">Sat :</span>
                        8:00AM - 2:00PM
                        <br />
                        <span className="text-gray font-bold">Fri: </span>
                        CLOSED
                    </p>
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            Souq Waqif Kiosk
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">Daily</span>
                        10:00AM - 5:00PM
                    </p>
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            National Museum Kiosk
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">Daily</span>
                        10:00AM - 5:00PM
                    </p>
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            Sheraton Hotel Park Kiosk
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">Daily</span>
                        10:00AM - 5:00PM
                    </p>
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            Katara Cultural Village Kiosk
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">Daily</span>
                        10:00AM - 5:00PM
                    </p>
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            Sealine Kiosk
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">Daily</span>
                        9:00AM - 5:00PM
                    </p>{" "}
                    {/*=================================*/}
                    <h4 className="flex">
                        <FaMapPin className="w-7 h-7" />
                        &nbsp;
                        <span className="text-custom-yellow">
                            Al Majles Resort
                        </span>
                    </h4>
                    <p>
                        <span className="text-gray font-bold">
                            Saturday to Wednesday :{" "}
                        </span>
                        9:00AM - 7:00PM <br />
                        <span className="text-gray font-bold">
                            Thursday & Friday:{" "}
                        </span>
                        10:00AM - 12:00AM
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
