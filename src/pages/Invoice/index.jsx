import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const lang = useSelector((state) => state.language.lang);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);
  const [plan, setPlan] = useState([]);
  const [category, setCategory] = useState([]);
  

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

  const generatePDF = () => {
    const invoiceElement = document.getElementById("invoice");

    const downloadButton = document.getElementById("download-button");
    if (downloadButton) downloadButton.style.display = "none";

    const images = invoiceElement.getElementsByTagName("img");
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      createPDF();
    } else {
      for (let img of images) {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === totalImages) {
            createPDF();
          }
        } else {
          img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              createPDF();
            }
          };
        }
      }
    }

    function createPDF() {
      html2canvas(invoiceElement, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save("invoice.pdf");

          if (downloadButton) downloadButton.style.display = "block";
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
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
              <h1 className="font-semibold text-[1.2rem]">Booking Details</h1>
              <div className="flex items-center justify-between mt-3 text-gray-500 font-semibold mb-5">
                <div>
                  <h2 className="mt-2">Booked Day</h2>
                  <h2 className="mt-2">Guest</h2>
                </div>
                <div className="w-[50%]">
                  <h2 className="mt-2">
                    {new Date(data.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <h2 className="mt-2">
                    {data.adultQuantity + data.childQuantity}
                  </h2>
                </div>
              </div>
              <hr />
              <div className="flex items-center justify-between mt-3 text-gray-500 font-semibold mb-5">
                <div>
                  <h2 className="mt-2">Name</h2>
                  <h2 className="mt-2">Status</h2>
                  <h2 className="mt-2">Total</h2>
                </div>
                <div className="w-[50%]">
                  <h2 className="mt-2">
                    {data.firstName + " " + data.lastName}
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
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Invoice;
