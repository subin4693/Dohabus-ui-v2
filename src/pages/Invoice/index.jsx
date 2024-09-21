import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/DOHA Bus Logo YB large.png";
import Loader from "../../components/Loader";

const Invoice = () => {
    const lang = useSelector((state) => state.language.lang);
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState([]);
    const [plan, setPlan] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/tickets/${id}`);
                setPlan(res.data.data.plan);
                setData(res.data.data.ticket);
                setCategory(res.data.data.planCategory);
                console.log("data>>>>>>>", res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [BASE_URL, id]);

    const generateTicketPDF = () => {
        setLoading(true);
        const invoiceElement = document.getElementById("invoice");

        html2canvas(invoiceElement).then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");

            const borderWidth = 10;
            const borderColor = [255, 255, 0];
            const titleColor = [255, 178, 44];
            const contactColor = [255, 178, 44];
            const payableToColor = titleColor;

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.setFillColor(...borderColor);
            pdf.rect(0, 5, borderWidth, pdfHeight, "F");

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...borderColor);

            const dateIssued = `Issued Date: ${new Date().toLocaleDateString(
                "en-GB",
                { day: "numeric", month: "long", year: "numeric" }
            )}`;
            const invoiceNumber = `TICKET#: ${data.uniqueId}`;

            const invoiceText = "TICKET";
            const invoiceTextWidth = pdf.getTextWidth(invoiceText);

            pdf.setFontSize(30);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text(invoiceText, borderWidth + 10, 40);

            const verticalOffset = 5;
            const rightAlignX = pdfWidth - borderWidth - 100;

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text(dateIssued, rightAlignX, 35 - verticalOffset);
            pdf.text(invoiceNumber, rightAlignX, 45 - verticalOffset);

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("CUSTOMER CONTACT", borderWidth + 10, 55);

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.text(`Name: ${data.firstName}  `, borderWidth + 10, 65);
            pdf.text(`Email: ${data.email}`, borderWidth + 10, 75);

            pdf.autoTable({
                startY: 80,
                head: [["Booking Details", ""]],
                body: [
                    [
                        "Booked Day:",
                        new Date(data.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }),
                    ],
                    ["Guest:", `${data.adultQuantity + data.childQuantity}`],
                    ["Name:", `${data.firstName} `],
                    ["Plan Title:", plan.title?.[lang] || "N/A"],
                    ["Category Title:", category.title?.[lang] || "N/A"],
                    ["Pickup:", data.pickupLocation || "N/A"],
                    ["Drop:", data.dropLocation || "N/A"],
                    [
                        "Add Ons:",
                        data?.addonFeatures?.length > 0
                            ? data.addonFeatures.join(", ")
                            : "No Add-ons",
                    ],
                    ["Status:", data.status],
                    ["Total:", `${data.price} QAR`],
                ],
                theme: "striped",
                styles: {
                    cellPadding: 5,
                    fontSize: 12,
                    font: "helvetica",
                    halign: "left",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [255, 255, 0],
                    textColor: [0, 0, 0],
                    fontSize: 14,
                    fontStyle: "bold",
                },
                margin: { left: borderWidth + 10 },
            });

            const tableHeight = pdf.autoTable.previous.finalY;
            const payableToY = pdfHeight - 45;

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("PAYABLE TO:", borderWidth + 10, payableToY);

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.text("Company: DOHABUS", borderWidth + 10, payableToY + 7);
            pdf.text("Phone: +974 4442 244", borderWidth + 10, payableToY + 17);
            pdf.text(
                "Location: Doha, Qatar",
                borderWidth + 10,
                payableToY + 27
            );
            pdf.text(
                "Website: www.dohabus.com",
                borderWidth + 10,
                payableToY + 37
            );

            const logoImage = new Image();
            logoImage.src = logo;
            logoImage.onload = () => {
                const logoWidth = 40;
                const logoHeight =
                    (logoImage.height / logoImage.width) * logoWidth;
                const logoX = borderWidth + 140;
                const logoY = pdfHeight - logoHeight - 12;

                pdf.addImage(
                    logoImage,
                    "PNG",
                    logoX,
                    logoY,
                    logoWidth,
                    logoHeight
                );
                setLoading(false);
                pdf.save("ticket.pdf");
            };
        });
    };

    const generatePDF = () => {
        setLoading(true);
        const invoiceElement = document.getElementById("invoice");

        html2canvas(invoiceElement).then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");

            const borderWidth = 10;
            const borderColor = [255, 255, 0];
            const titleColor = [255, 178, 44];
            const contactColor = [255, 178, 44];
            const payableToColor = titleColor;

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.setFillColor(...borderColor);
            pdf.rect(0, 5, borderWidth, pdfHeight, "F");

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...borderColor);

            const dateIssued = `Issued Date: ${new Date().toLocaleDateString(
                "en-GB",
                { day: "numeric", month: "long", year: "numeric" }
            )}`;
            const invoiceNumber = `INVOICE#: ${data.uniqueId}`;

            const invoiceText = "INVOICE";
            const invoiceTextWidth = pdf.getTextWidth(invoiceText);

            pdf.setFontSize(30);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text(invoiceText, borderWidth + 10, 40);

            const verticalOffset = 5;
            const rightAlignX = pdfWidth - borderWidth - 100;

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text(dateIssued, rightAlignX, 35 - verticalOffset);
            pdf.text(invoiceNumber, rightAlignX, 45 - verticalOffset);

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("CUSTOMER CONTACT", borderWidth + 10, 55);

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.text(`Name: ${data.firstName}  `, borderWidth + 10, 65);
            pdf.text(`Email: ${data.email}`, borderWidth + 10, 75);

            pdf.autoTable({
                startY: 80,
                head: [["Booking Details", ""]],
                body: [
                    [
                        "Booked Day:",
                        new Date(data.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }),
                    ],
                    ["Guest:", `${data.adultQuantity + data.childQuantity}`],
                    ["Name:", `${data.firstName}  `],
                    ["Plan Title:", plan.title?.[lang] || "N/A"],
                    ["Category Title:", category.title?.[lang] || "N/A"],
                    ["Pickup:", data.pickupLocation || "N/A"],
                    ["Drop:", data.dropLocation || "N/A"],
                    [
                        "Add Ons:",
                        data?.addonFeatures?.length > 0
                            ? data.addonFeatures.join(", ")
                            : "No Add-ons",
                    ],
                    ["Status:", data.status],
                    ["Total:", `${data.price} QAR`],
                ],
                theme: "striped",
                styles: {
                    cellPadding: 5,
                    fontSize: 12,
                    font: "helvetica",
                    halign: "left",
                    valign: "middle",
                },
                headStyles: {
                    fillColor: [255, 255, 0],
                    textColor: [0, 0, 0],
                    fontSize: 14,
                    fontStyle: "bold",
                },
                margin: { left: borderWidth + 10 },
            });

            const tableHeight = pdf.autoTable.previous.finalY;
            const payableToY = pdfHeight - 45;

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("PAYABLE TO:", borderWidth + 10, payableToY);

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.text("Company: DOHABUS", borderWidth + 10, payableToY + 7);
            pdf.text("Phone: +974 4442 244", borderWidth + 10, payableToY + 17);
            pdf.text(
                "Location: Doha, Qatar",
                borderWidth + 10,
                payableToY + 27
            );
            pdf.text(
                "Website: www.dohabus.com",
                borderWidth + 10,
                payableToY + 37
            );

            const logoImage = new Image();
            logoImage.src = logo;
            logoImage.onload = () => {
                const logoWidth = 40;
                const logoHeight =
                    (logoImage.height / logoImage.width) * logoWidth;
                const logoX = borderWidth + 140;
                const logoY = pdfHeight - logoHeight - 12;

                pdf.addImage(
                    logoImage,
                    "PNG",
                    logoX,
                    logoY,
                    logoWidth,
                    logoHeight
                );
                generateTicketPDF();
                setLoading(false);
                pdf.save("invoice.pdf");
            };
        });
    };

    return (
        <div className="p-20 flex justify-center items-center">
            <motion.div
                id="invoice"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-5 border rounded-2xl p-5 shadow-lg flex justify-center flex-wrap gap-5"
            >
                <div className="w-[50vh] lg:w-[60vh] border">
                    <img
                        className="w-full h-[600px] object-cover"
                        src={plan.coverImage}
                        alt="Plan Cover"
                    />
                </div>
                <div className="w-[50vh] lg:w-[60vh] border-2 rounded p-5">
                    <h1 className="text-4xl font-semibold">Completed 🎉</h1>
                    <div className="flex gap-3 mt-3 items-center">
                        <img
                            className="w-[50px] h-[40px] object-cover rounded-xl"
                            src={plan.galleryimages?.[0]}
                            alt="Gallery Image"
                        />
                        <div>
                            <h2 className="font-bold">{plan.title?.[lang]}</h2>
                            <h2 className="font-bold text-gray-500">
                                {category.title?.[lang]}
                            </h2>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="border-2 p-3">
                            <h1 className="font-semibold text-[1.2rem]">
                                Booking Details
                            </h1>
                            <div className="flex items-center justify-between mt-3  text-gray-500 font-semibold mb-5">
                                <div>
                                    <h2 className="mt-2">Booked Day</h2>
                                    <h2 className="mt-2">Guest</h2>
                                </div>
                                <div className="w-[50%]">
                                    <h2 className="mt-2">
                                        {new Date(data.date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </h2>
                                    <h2 className="mt-2">
                                        {data.adultQuantity +
                                            data.childQuantity}
                                    </h2>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between mt-3 text-gray-500 font-semibold mb-5">
                                <div>
                                    <h2 className="mt-2">Name</h2>
                                    <h2 className="mt-2">Add Ons</h2>
                                    <h2 className="mt-2">Status</h2>
                                    <h2 className="mt-2">Total</h2>
                                </div>
                                <div className="w-[50%]">
                                    <h2 className="mt-2">{data.firstName}</h2>
                                    <h2 className="mt-2">
                                        {data?.addonFeatures?.length > 0 ? (
                                            data.addonFeatures.map(
                                                (addon, index) => (
                                                    <span key={index}>
                                                        {addon}
                                                        {index <
                                                            data.addonFeatures
                                                                .length -
                                                                1 && ", "}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span>No Add-ons</span>
                                        )}
                                    </h2>

                                    <h2 className="mt-2">{data.status}</h2>
                                    <h2 className="mt-2">{data.price} QAR</h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                id="download-button"
                                onClick={generatePDF}
                                className="mt-5 bg-custom-yellow p-3 text-xl font-semibold w-[200px]"
                            >
                                {loading ? (
                                    <div className="">
                                        <Loader w={50} h={50} b={10} />
                                    </div>
                                ) : (
                                    "Download"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Invoice;
