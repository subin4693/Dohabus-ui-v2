import React from "react";
import { BiTrash } from "react-icons/bi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../assets/DOHA Bus Logo YB large.png";

const TicketCard = ({ booking, lang, handleCancelTicket, mainUserRole }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const generatePDF = () => {
        const invoiceElement = document.getElementById("ticket");

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
            const invoiceNumber = `TICKET#: ${booking.uniqueId}`;

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
            pdf.text(
                `Name: ${booking && booking?.user?.name} `,
                borderWidth + 10,
                65
            );
            pdf.text(
                `Email: ${booking && booking?.email}`,
                borderWidth + 10,
                75
            );

            pdf.autoTable({
                startY: 80,
                head: [["Booking Details", ""]],
                body: [
                    [
                        "Booked Day:",
                        new Date(booking.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }),
                    ],
                    [
                        "Guest:",
                        `${booking.adultQuantity + booking.childQuantity}`,
                    ],
                    ["Name:", `${booking.firstName} `],
                    ["Plan Title:", booking.plan.title?.[lang] || "N/A"],
                    [
                        "Category Title:",
                        booking.category.title?.[lang] || "N/A",
                    ],
                    ["Pickup:", booking.pickupLocation || "N/A"],
                    ["Drop:", booking.dropLocation || "N/A"],
                    [
                        "Add Ons:",
                        booking?.addonFeatures?.length > 0
                            ? booking.addonFeatures.join(", ")
                            : "No Add-ons",
                    ],
                    ["Status:", booking.status],
                    ["Total:", `${booking.totalPrice} QAR`],
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

                pdf.save("Ticket.pdf");
            };
        });
    };

    return (
        <div
            id="ticket"
            className={`bg-white shadow-lg rounded-lg p-5 border w-[300px] ${
                booking.status.toLowerCase() !== "booked"
                    ? "border-2 border-red-500 "
                    : " border-stone-300 "
            }`}
        >
            {/* <div className="flex-shrink-0">
                <img
                    src={booking && booking?.plan?.coverImage}
                    alt="Plan"
                    className="h-[200px] object-cover rounded-lg border border-stone-200 shadow-sm"
                />
            </div> */}

            {/* Details Section */}
            <div className="flex-1 group">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold mb-1 h-[55px] overflow-hidden">
                        {booking && booking?.plan?.title[lang]}
                    </h3>

                    {booking.status.toLowerCase() === "canceled" ? (
                        <div className="p-1 rounded-md text-white px-2 cursor-pointer flex items-center space-x-2 bg-red-500">
                            Canceled
                        </div>
                    ) : (
                        mainUserRole === "super-admin" &&
                        booking.status.toLowerCase() === "booked" && (
                            <div
                                className="p-1 rounded-md bg-gray-100 text-red-500 cursor-pointer flex items-center space-x-2"
                                onClick={() => handleCancelTicket(booking._id)}
                            >
                                <BiTrash className="w-6 h-6" />
                                <span>Cancel</span>
                            </div>
                        )
                    )}
                </div>
                <p className="text-stone-600 mb-2">
                    Name : {booking && booking?.user?.name}
                </p>{" "}
                <p className="text-stone-600 mb-2">
                    Contact Number : {booking && booking?.number}
                </p>
                {/* <p className="text-stone-600 mb-2">{booking && booking?.user?.email}</p> */}
                <p className="text-stone-500 mb-2 line-clamp-3">
                    {/* {booking && booking?.plan?.description[lang]} */}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="font-medium text-stone-800">
                            Child Tickets:
                        </span>{" "}
                        {booking && booking?.childQuantity}
                    </div>
                    <div>
                        <span className="font-medium text-stone-800">
                            Adult Tickets:
                        </span>{" "}
                        {booking && booking?.adultQuantity}
                    </div>
                    <div>
                        <span className="font-medium text-stone-800">
                            Price:
                        </span>{" "}
                        {booking && booking?.totalPrice} Qat
                    </div>
                </div>
            </div>
            <button
                onClick={() => generatePDF()}
                className="p-1 mt-3 border w-full text-[1.1rem] bg-custom-yellow"
            >
                Download
            </button>
        </div>
    );
};

export default TicketCard;
