import React, { useState } from "react";
import Banner from "../../../components/Banner";
import { motion } from "framer-motion";
import contactImg from "../../../assets/contact.jpg";

const AdminCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      tourDetails: "Amazing Beach Tour",
      category: "Beach",
      user: "John Doe",
      userContact: "john@gmail.com",
    },
    {
      tourDetails: "Historical City Tour",
      category: "City",
      user: "Jane Smith",
      userContact: "jane@gmail.com",
    },
    {
      tourDetails: "Doha Tour",
      category: "Mall",
      user: "Jane Smith",
      userContact: "b@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.tourDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userContact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Banner
        image={contactImg}
        title={"Admin Cart"}
        subTitle={"Home | Admin-Cart"}
      />

      <div className="p-5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-center">
          Admin Cart Details
        </h1>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="p-6 mt-5 mb-5 border border-4 shadow-lg rounded-lg"
        >
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 w-full sm:w-[500px] py-2 border-b-4 border-yellow-500 font-semibold text-lg outline-none shadow-sm"
            />
          </div>

          <div className="overflow-x-auto">
            {currentItems.length > 0 ? (
              <>
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        Tour Details
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        User Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {item.tourDetails}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.userContact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-center text-lg text-gray-500">No data found</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } rounded-lg shadow-sm`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCart;
