import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TourPlanForm from "./TourPlanForm";
import EditPlanForm from "./EditPlanForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Tours = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [plans, setPlans] = useState([]);
    const mainUser = useSelector((state) => state.user.user);

    const [editPlan, setEditPlan] = useState(null);

    const lang = useSelector((state) => state.language.lang);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleDialog = () => {
        setIsOpen((prev) => !prev);
    };

    const switchActive = async (id) => {
        try {
            const res = await axios.patch(BASE_URL + "/plans/" + id);
            const updatedPlan = res.data.data.plan;

            setPlans((prevPlans) =>
                prevPlans.map((plan) =>
                    plan._id === updatedPlan._id ? updatedPlan : plan
                )
            );

            toast.success("Plan status changed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        const getTours = async () => {
            try {
                const res = await axios.get(BASE_URL + "/admin/plans");
                console.log(res?.data?.data);
                setPlans(res?.data?.data);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        getTours();
    }, []);

    const handleRemove = async (id) => {
        try {
            if (id) {
                // Make delete request to the server
                const res = await axios.delete(`${BASE_URL}/plans/${id}`);

                // Show success message
                toast.success("Plan deleted successfully!", {
                    theme: "dark",
                });

                // Update the state to remove the deleted cruise from the UI
                setPlans((prevCategories) =>
                    prevCategories.filter((category) => category._id !== id)
                );
            }
        } catch (error) {
            // Show error message
            toast.error("Failed to delete Plan.", { theme: "dark" });
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Current Plans</h1>
                {mainUser && mainUser?.role == "super-admin" && (
                    <button
                        className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                        onClick={handleDialog}
                    >
                        Add Plan
                    </button>
                )}
            </div>

            <div className="mt-5 space-y-5">
                {/* Example Card Display (Replace with real data from API) */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto px-4">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="flex flex-col border border-slate-200 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 bg-white  "
                        >
                            <div className="relative h-56 w-full">
                                <img
                                    src={plan.coverImage}
                                    alt={plan.title[lang] || "Tour Image"}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <h2 className="text-lg font-semibold">
                                        {plan.categoryDetails?.title[lang] ||
                                            "Category Name"}
                                    </h2>
                                </div>
                            </div>
                            <div className="flex flex-col   h-full justify-between p-4 space-y-3">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">
                                        {plan.title[lang] || "Tour Title"}
                                    </h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {plan.description[lang] ||
                                            "Description not available"}
                                    </p>
                                </div>
                                <div className="flex  flex-col">
                                    <Link
                                        to={`/tours/${plan.categoryDetails?._id}/${plan._id}`}
                                        className="mt-4 p-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                                    >
                                        View Details
                                    </Link>
                                    {mainUser &&
                                        mainUser.role === "super-admin" && (
                                            <>
                                                {" "}
                                                <button
                                                    onClick={() => {
                                                        setEditPlan(plan._id);
                                                    }}
                                                    className="mt-4 p-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={`mt-4 p-2 text-center text-white rounded-md transition duration-200 ${
                                                        plan.isActive
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                                    onClick={() =>
                                                        switchActive(plan._id)
                                                    }
                                                >
                                                    {plan.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </button>
                                            </>
                                        )}
                                    <button
                                        onClick={() => handleRemove(plan._id)}
                                        className="mt-5 bg-red-500 p-2 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isOpen && <TourPlanForm onClose={handleDialog} />}
            {editPlan && (
                <EditPlanForm
                    editPlan={editPlan}
                    onClose={() => setEditPlan(null)}
                />
            )}
        </div>
    );
};

export default Tours;
