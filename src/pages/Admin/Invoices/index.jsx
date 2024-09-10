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
              .includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, data, lang]);

  // Function to generate the PDF with plain text
  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    // Adding text content to the PDF
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(16);
    doc.text(`Plan: ${invoice.plan.title[lang]}`, 20, 40);
    doc.text(`Category: ${invoice.category.title[lang]}`, 20, 50);
    doc.text(`Name: ${invoice.firstName} ${invoice.lastName}`, 20, 60);
    doc.text(`Price: ${invoice.price} QAR`, 20, 70);
    doc.text(`Status: ${invoice.status}`, 20, 80);

    // Save the generated PDF
    doc.save(`invoice-${invoice._id}.pdf`);
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
              className="card border-2  h-[390px] p-5 rounded-2xl shadow-lg bg-gray-200 flex flex-col justify-between"
            >
              <div className="w-full h-[200px]">
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
