import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const Index = () => {
  const lang = useSelector((state) => state.language.lang);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tickets/all`);
        setData(res.data.data.tickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);
  console.log("data", data);
  // Function to generate the PDF with plain text
  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    // Adding text content to the PDF
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(16);
    doc.text(`Plan: ${invoice.plan.title.en}`, 20, 40);
    doc.text(`Category: ${invoice.category.title.en}`, 20, 50);
    doc.text(`Name: ${invoice.firstName} ${invoice.lastName}`, 20, 60);
    doc.text(`Price: ${invoice.price} QAR`, 20, 70);
    doc.text(`Status: ${invoice.status}`, 20, 80);

    // Save the generated PDF
    doc.save(`invoice-${invoice._id}.pdf`);
  };

  return (
    <div>
      <div className="cards flex justify-center items-center flex-wrap gap-5 mt-10">
        {data.map((invoice) => (
          <div
            key={invoice._id}
            className="card border-2 w-[400px] h-[390px] p-5 rounded-2xl shadow-lg bg-gray-200"
          >
            <h1 className="text-3xl mt-1">{invoice.plan.title[lang]}</h1>
            <h2 className="text-xl mt-1">{invoice.category.title[lang]}</h2>
            <h2 className="text-xl mt-1">
              Name: {invoice.firstName + " " + invoice.lastName}
            </h2>
            <h2 className="text-xl mt-1">
              Guest: {invoice.adultQuantity + invoice.childQuantity}
            </h2>
            <h2 className="text-xl mt-1">Price: {invoice.price} QAR</h2>
            <h2 className="text-xl mt-1">Status: {invoice.status}</h2>
            <button
              onClick={() => generatePDF(invoice)}
              className="mt-16 w-full p-3 border bg-custom-yellow text-xl font-semibold"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
