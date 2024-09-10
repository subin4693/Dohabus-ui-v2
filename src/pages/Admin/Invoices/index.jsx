import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../assets/DOHA Bus Logo YB large.png";

const Index = () => {
  const lang = useSelector((state) => state.language.lang);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tickets/all`);
        setData(res.data.data.tickets);
        setFilteredData(res.data.data.tickets); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);

  console.log("Invoices", filteredData);
  useEffect(() => {
    // Filter the data based on search query
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (invoice) =>
            invoice.plan.title[lang]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            invoice.category.title[lang]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (invoice.firstName + " " + invoice.lastName)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data, lang]);

  // Function to generate the PDF with plain text
  // const generatePDF = (invoice) => {
  //   const doc = new jsPDF();

  //   // Adding text content to the PDF
  //   doc.setFontSize(22);
  //   doc.text("Invoice", 105, 20, null, null, "center");

  //   doc.setFontSize(16);
  //   doc.text(`Plan: ${invoice.plan.title[lang]}`, 20, 40);
  //   doc.text(`Category: ${invoice.category.title[lang]}`, 20, 50);
  //   doc.text(`Name: ${invoice.firstName} ${invoice.lastName}`, 20, 60);
  //   doc.text(`Price: ${invoice.price} QAR`, 20, 70);
  //   doc.text(`Status: ${invoice.status}`, 20, 80);

  //   // Save the generated PDF
  //   doc.save(`invoice-${invoice._id}.pdf`);
  // };

  const generatePDF = (invoice) => {
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
      const invoiceNumber = `INVOICE#: ${invoice._id}`;

      const invoiceText = "INVOICE";
      const invoiceTextWidth = pdf.getTextWidth(invoiceText);

      pdf.setFontSize(30);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...borderColor);
      pdf.text(invoiceText, borderWidth + 10, 40);

      const verticalOffset = 5;
      const rightAlignX = pdfWidth - borderWidth - 100;

      pdf.setFontSize(14);
      pdf.setTextColor(...borderColor);
      pdf.text(dateIssued, rightAlignX, 35 - verticalOffset);
      pdf.text(invoiceNumber, rightAlignX, 45 - verticalOffset);

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...borderColor);
      pdf.text("CUSTOMER CONTACT", borderWidth + 10, 55);

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        `Name: ${invoice.firstName} ${invoice.lastName}`,
        borderWidth + 10,
        65
      );
      pdf.text(`Email: ${invoice.email}`, borderWidth + 10, 75);

      pdf.autoTable({
        startY: 80,
        head: [["Booking Details", ""]],
        body: [
          [
            "Booked Day:",
            new Date(invoice.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          ],
          ["Guest:", `${invoice.adultQuantity + invoice.childQuantity}`],
          ["Name:", `${invoice.firstName} ${invoice.lastName}`],
          ["Plan Title:", invoice.plan.title?.[lang] || "N/A"],
          ["Category Title:", invoice.category.title?.[lang] || "N/A"],
          ["Pickup:", invoice.pickupLocation || "N/A"],
          ["Drop:", invoice.dropLocation || "N/A"],
          [
            "Add Ons:",
            invoice?.addonFeatures?.length > 0
              ? invoice.addonFeatures.join(", ")
              : "No Add-ons",
          ],
          ["Status:", invoice.status],
          ["Total:", `${invoice.price} QAR`],
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
          textColor: [255, 255, 255],
          fontSize: 14,
          fontStyle: "bold",
        },
        margin: { left: borderWidth + 10 },
      });

      const tableHeight = pdf.autoTable.previous.finalY;
      const payableToY = pdfHeight - 45;

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...borderColor);
      pdf.text("PAYABLE TO:", borderWidth + 10, payableToY);

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Company: BOHABUS", borderWidth + 10, payableToY + 7);
      pdf.text("Phone: +974 4442 244", borderWidth + 10, payableToY + 17);
      pdf.text("Location: Doha, Qatar", borderWidth + 10, payableToY + 27);
      pdf.text("Website: www.dohabus.com", borderWidth + 10, payableToY + 37);

      const logoImage = new Image();
      logoImage.src = logo;
      logoImage.onload = () => {
        const logoWidth = 40;
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
        const logoX = borderWidth + 140;
        const logoY = pdfHeight - logoHeight - 12;

        pdf.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);

        pdf.save("invoice.pdf");
      };
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search invoice"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-md px-2 py-1"
        />
      </div>
      <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {filteredData.length > 0 ? (
          filteredData.map((invoice) => (
            <div
              key={invoice._id}
              className="card border-2 p-5 rounded-2xl shadow-lg bg-gray-200 flex flex-col justify-between"
              id="invoice"
            >
              <div className="">
                <img
                  className="w-full h-[300px] object-cover rounded-2xl"
                  src={invoice.plan.coverImage}
                  alt={invoice.plan.title.en}
                />
              </div>
              <div className="w-full h-[200px] mt-2">
                <h1 className="text-3xl mt-1">{invoice.plan.title[lang]}</h1>
                <h2 className="text-xl mt-1">{invoice.category.title[lang]}</h2>
                <h2 className="text-xl mt-1">
                  Name: {invoice.firstName + " " + invoice.lastName}
                </h2>
                <h2 className="text-xl mt-1">
                  Email: {invoice.email}
                </h2>
                <h2 className="text-xl mt-1">
                  Guest: {invoice.adultQuantity + invoice.childQuantity}
                </h2>
                <h2 className="text-xl mt-1">Price: {invoice.price} QAR</h2>
                <h2 className="text-xl mt-1">Status: {invoice.status}</h2>
              </div>
              <button
                onClick={() => generatePDF(invoice)}
                className="mt-16 w-full p-1 border rounded-md hover:bg-dark hover:text-white duration-300 bg-custom-yellow text-xl "
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Index;
