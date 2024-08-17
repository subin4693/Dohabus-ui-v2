import React, { useState } from "react";
import Banner from "../../components/Banner";

import singleTour from "../../assets/single-tour.jpg";
import album1 from "../../assets/album1.jpg";
import album2 from "../../assets/album2.jpg";
import album3 from "../../assets/album3.jpg";
import album4 from "../../assets/album4.jpg";
import album5 from "../../assets/album5.jpg";
import album6 from "../../assets/album6.jpg";

import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
const SingleTour = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const album = [album1, album2, album3, album4, album5, album6];
    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + album.length) % album.length,
        );
    };
    return (
        <div>
            <Banner
                image={singleTour}
                title={"Monster Bus Tour in the Desert"}
                subTitle={"Home | Tours"}
            />
            <div className="xl:w-[70%] mx-auto">
                <div className="mt-10 p-10  flex gap-5  flex-col lg:flex-row space-y-3">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                Itinerary
                            </h2>
                            <p className="text-gray leading-7">
                                Take a ride through the mighty dunes in the
                                exclusive off-road monster bus. This is an
                                experience you would never want to miss. We will
                                take you into the heart of the desert on the
                                massive 32 seater off-road Monster Bus where you
                                will take on the Qatari dunes and experience
                                desert hospitality.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl text-custom-yellow ">
                                Tour Highlights
                            </h2>
                            <ul className="text-gray pl-5 list-disc leading-7">
                                <li>
                                    A serene drive from Doha to Sealine desert
                                </li>
                                <li>
                                    Take on the towering Qatari desert with the
                                    mighty Monster Bus perfect for adventurous
                                    individuals and groups
                                </li>
                                <li>
                                    Come across oryx’s at the Al Majles Resort
                                </li>
                                <li>
                                    Have a refreshing beverage as you take in
                                    the sea and desert views from Al Majles
                                    Resort
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                Timings
                            </h2>
                            <p className="text-gray leading-7">
                                AM tour: 9:00AM - 12:00NN | PM tour: 2:00PM -
                                5:00PM
                                <br />
                                We recommend afternoon tours during the summer
                                season.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl text-custom-yellow">
                                What's Included?
                            </h2>
                            <ul className="text-gray pl-5 list-disc leading-7">
                                <li>
                                    Pick up and drop off from your location
                                    within Doha city limits
                                </li>
                                <li>
                                    Off-road desert drive through the sand dunes
                                    on the Monster Bus with our experienced
                                    driver
                                </li>
                                <li>
                                    Quick stop at Al Majles Resort for photo
                                    opportunities
                                </li>
                                <li>Photo opportunity with Oryx</li>
                                <li>Refreshing beverage</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mx-10 md:mx-20">
                    {/* Default Table for Large Screens */}
                    <table className="hidden lg:table w-full">
                        <thead>
                            <tr className="bg-custom-yellow">
                                <th className="p-5">No of Pax</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4-6</th>
                                <th>7-9</th>
                                <th>10 & More</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center text-gray-dark bg-gray-100 ">
                                <td className="font-bold">
                                    Price per Adult (12 yrs+)
                                </td>
                                <td className="p-10">QAR 1,024</td>
                                <td className="p-10">QAR 621</td>
                                <td className="p-10">QAR 506</td>
                                <td className="p-10">QAR 449</td>
                                <td className="p-10">QAR 391</td>
                                <td className="p-10">QAR 334</td>
                            </tr>
                            <tr className="text-center text-gray-dark bg-gray-100 ">
                                <td className="font-bold">
                                    Price per Child (3-11 yrs)
                                </td>
                                <td className="p-10">QAR 1,024</td>
                                <td className="p-10">QAR 621</td>
                                <td className="p-10">QAR 506</td>
                                <td className="p-10">QAR 449</td>
                                <td className="p-10">QAR 391</td>
                                <td className="p-10">QAR 334</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Responsive Card-like Layout for Smaller Screens */}
                    <div className="lg:hidden">
                        <div className="space-y-4">
                            <div className="bg-gray-200 p-4 rounded-md">
                                <h3 className="font-bold text-lg">
                                    Price per Adult (12 yrs+)
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex justify-between">
                                        <span>1</span>
                                        <span>QAR 1,024</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>2</span>
                                        <span>QAR 621</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>3</span>
                                        <span>QAR 506</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>4-6</span>
                                        <span>QAR 449</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>7-9</span>
                                        <span>QAR 391</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>10 & More</span>
                                        <span>QAR 334</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-md">
                                <h3 className="font-bold text-lg">
                                    Price per Child (3-11 yrs)
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex justify-between">
                                        <span>1</span>
                                        <span>QAR 1,024</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>2</span>
                                        <span>QAR 621</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>3</span>
                                        <span>QAR 506</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>4-6</span>
                                        <span>QAR 449</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>7-9</span>
                                        <span>QAR 391</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>10 & More</span>
                                        <span>QAR 334</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-10 mt-10 ">
                    <div>
                        <h2 className="text-2xl text-custom-yellow ">
                            Important Information
                        </h2>
                        <ul className="text-gray pl-5 list-disc leading-7">
                            <li>
                                Bring sunblock, sunglasses, cap/hat and wear
                                comfortable light clothing.
                            </li>
                            <li>Tour is on sharing basis and non-guided.</li>
                            <li>
                                Camel riding can be purchased at your stop in Al
                                Majles Resort.
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div>
                        <h2 className="text-2xl text-custom-yellow ">
                            Cancellation Policy
                        </h2>
                        <p className="text-gray py-5">
                            A strict cancellation fee will be applicable to
                            compensate for costs and lost revenue. Once a
                            booking is made the following cancellation fees will
                            apply:
                        </p>
                        <ul className="text-gray pl-5 list-disc leading-7">
                            <li>
                                7 days – 72 hours prior to service date: No
                                cancellation fee
                            </li>
                            <li>
                                72 hours – 24 hours prior to service date: 50%
                                cancellation fee, 50% refund.
                            </li>
                            <li>
                                Less than 24 hours prior to service date: 100%
                                cancellation fee, no refund
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center items-center p-5">
                    <button className=" bg-custom-yellow py-3 px-5 rounded-md ">
                        Book Now
                    </button>
                </div>{" "}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-5 flex-wrap justify-center items-center">
                        {album.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index}`}
                                className="object-cover w-[150px] h-[150px] cursor-pointer"
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </div>
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
