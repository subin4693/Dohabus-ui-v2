import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Add this for table support
import Loader from "../../../components/Loader";

const Index = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [subscribers, setSubscribers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSubscribers, setFilteredSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/subscribe`);
                setSubscribers(response.data.data.subscribers);
                setFilteredSubscribers(response.data.data.subscribers);
                console.log("subscribers", response.data.data.subscribers);
            } catch (error) {
                console.error("Error fetching subscribers:", error.message);
            }
        };

        fetchSubscribers();
    }, [BASE_URL]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = subscribers.filter(
            (subscriber) =>
                subscriber.name.toLowerCase().includes(lowerCaseQuery) ||
                subscriber.email.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredSubscribers(filtered);
    }, [searchQuery, subscribers]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDownload = () => {
        setLoading(true);
        const doc = new jsPDF();
        doc.text("Subscribers List", 10, 10);

        const tableColumn = ["Name", "Email"];
        const tableRows = filteredSubscribers.map((subscriber) => [
            subscriber.name,
            subscriber.email,
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        setLoading(false);
        doc.save("subscribers.pdf");
    };

    return (
        <div className="mt-10 bg-gray-200 p-5">
            <div className="flex justify-end gap-5">
                <input
                    className="border w-[400px] p-3 outline-none font-semibold text-xl"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    onClick={handleDownload}
                    className="border p-2 w-[200px] text-xl font-semibold bg-custom-yellow rounded-xl"
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
            <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
                {filteredSubscribers.length > 0 ? (
                    filteredSubscribers.map((subscriber) => (
                        <div
                            key={subscriber._id}
                            className="flex justify-center border items-center gap-4 w-[400px] h-[100px] bg-white shadow-lg"
                        >
                            <FaUserCircle className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm" />
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {subscriber.name}
                                </h3>
                                <p className="text-gray-600">
                                    {subscriber.email}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No subscribers found</p>
                )}
            </div>
        </div>
    );
};

export default Index;
