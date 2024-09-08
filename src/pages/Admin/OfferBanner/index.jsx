import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

const Index = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [offers, setOffers] = useState([]); // Initialize as an empty array
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [percentage, setPercentage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const lang = useSelector((state) => state.language.lang);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "titleAr") setTitleAr(value);
    if (name === "percentage") setPercentage(value);
    if (name === "plan") setSelectedPlan(value);
  };

  const handleSubmit = async () => {
    console.log("Button clicked"); // Debug log
    try {
      const payload = {
        title: {
          en: title,
          ar: titleAr,
        },
        percentage: Number(percentage),
        tourIds: selectedPlan ? [selectedPlan] : [], // Ensure this is an array
      };

      console.log("Payload:", payload);

      const response = await axios.post(`${BASE_URL}/offerbanner`, payload, {
        withCredentials: true,
      });

      console.log("Response:", response.data);
      closeModal();
      fetchOffers(); // Fetch offers again to update the list
    } catch (error) {
      console.error(
        "Error creating offer banner:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/offerbanner`, {
        withCredentials: true,
      });
      console.log("Offers Response:", response.data);
      setOffers(response.data); // Adjust according to the actual data structure
    } catch (error) {
      console.error(
        "Error fetching offers:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const toggleStatus = async (offerId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.patch(
        `${BASE_URL}/offerbanner/${offerId}/status`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      fetchOffers(); // Refresh the list to reflect the updated status
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`${BASE_URL}/offerbanner/${offerId}`, {
        withCredentials: true,
      });
      fetchOffers(); // Refresh the list to reflect the deletion
    } catch (error) {
      console.error(
        "Error deleting offer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/plans`, {
          withCredentials: true,
        });
        console.log("Plans Response:", response.data);
        setPlans(response?.data?.data?.plans || []);
      } catch (error) {
        console.error(
          "Error fetching plans:",
          error.response ? error.response.data : error.message
        );
      }
    };

    getPlans(); // Fetch plans
    fetchOffers(); // Fetch offers
  }, [BASE_URL]);

  return (
    <>
      <div className="text-end">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add offer
        </button>
      </div>

      <div className="flex justify-center items-center">
        {isOpen && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
          >
            <div
              className="bg-white rounded-lg p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Edit or Add Offer Banner
              </h2>
              <div className="">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                  className="w-full border p-2 outline-none mt-3"
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="titleAr"
                  value={titleAr}
                  onChange={handleInputChange}
                  className="w-full border p-2 outline-none text-end mt-3"
                  placeholder="العنوان"
                />
                <input
                  type="number"
                  name="percentage"
                  value={percentage}
                  onChange={handleInputChange}
                  className="w-full border p-2 outline-none mt-3"
                  placeholder="Enter the percent"
                />
                <select
                  name="plan"
                  value={selectedPlan}
                  onChange={handleInputChange}
                  className="w-full border mt-3 p-2 outline-none"
                >
                  <option value="">All</option>
                  {plans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.title[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded mt-3"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="cards flex gap-3 mt-5 flex-wrap">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div
              key={offer._id}
              className="card w-[300px] border rounded-2xl bg-gray-300 p-2 mb-4 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-center">
                {offer.title[lang] || "Offer Title"}
              </h2>
              <div className="w-full flex gap-1 flex-wrap overflow-hidden justify-center items-center text-center">
                <h2 className="font-semibold text-3xl">
                  {offer.tourId.length} Tours
                </h2>
              </div>
              <h3 className="text-center font-bold mt-2">
                Offer {offer.percentage || "0%"} %
              </h3>
              <div className="mt-2 w-full flex justify-between items-center">
                <h1
                  className={`px-3 py-1 rounded-full text-white cursor-pointer ${
                    offer.status === "Active"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={() => toggleStatus(offer._id, offer.status)}
                >
                  {offer.status}
                </h1>
                <FaTrashAlt
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleDelete(offer._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No offers available</p>
        )}
      </div>
    </>
  );
};

export default Index;
