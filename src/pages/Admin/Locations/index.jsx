import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card"; // Import Card component
import axios from "axios";
import { toast } from "react-toastify";
// Initial details data
const initialDetails = [
  {
    _id: "1",
    title: { en: "Event Title", ar: "عنوان الحدث" },
    dates: [
      { day: { en: "Monday", ar: "الإثنين" }, time: "8pm-10pm" },
      { day: { en: "Tuesday", ar: "الثلاثاء" }, time: "6pm-8pm" },
    ],
  },
];

const DetailsManager = () => {
  const mainUser = useSelector((state) => state.user.user);
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [details, setDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State to track if we're editing an existing item
  const [currentDetail, setCurrentDetail] = useState(null); // State to track which item is being edited or created
  const [loading, setLoading] = useState(false);

  const lang = useSelector((state) => state.language.lang);

  // Function to handle adding a new detail
  const handleCreate = () => {
    setCurrentDetail(null); // No current detail means creating a new one
    setIsEditing(true); // Show the edit/create form
  };

  // Function to handle saving a new or edited detail
  const handleSave = async (detail) => {
    setLoading(true);
    if (currentDetail && isEditing) {
      try {
        const data = await axios.put(
          BASE_URL + "/locations/" + detail._id,
          detail
        );

        const resData = data.data.data.location;

        setDetails((prevDetails) =>
          prevDetails.map((d) => (d._id === resData._id ? resData : d))
        );

        toast.success("Location edited Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    } else {
      try {
        const data = await axios.post(BASE_URL + "/locations", detail);
        let tempData = data.data.data.location;

        setDetails((prevDetails) => [...prevDetails, tempData]);
        toast.success("New location added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
        toast.error("Someyhing went wrong. Try again later...", {
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
    }
    setIsEditing(false); // Hide the edit/create form
  };

  // Function to handle deleting a detail
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(BASE_URL + "/locations/" + id, detail);

      setDetails((prevDetails) =>
        prevDetails.map((d) => (d._id === resData._id ? resData : d))
      );
      toast.success("Deleted successfully", {
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
    }

    setDetails((prevDetails) =>
      prevDetails.filter((detail) => detail._id !== id)
    );
  };

  // Function to handle editing a detail
  const handleEdit = (detail) => {
    setCurrentDetail(detail); // Set the detail to be edited
    setIsEditing(true); // Show the edit form
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/locations");
        setDetails(res.data.data.locations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mb-2">Details</h1>
        {mainUser && mainUser.role === "super-admin" && (
          <button
            className="bg-custom-yellow px-3 py-2 rounded-md duration-300 hover:text-white hover:bg-black"
            onClick={handleCreate} // Open create form
          >
            Create new
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {details.map((detail) => (
          <div
            key={detail._id} // Added key prop
            className="bg-gray-100 rounded-md shadow-md p-5 w-[400px] relative"
          >
            <>
              <h4 className="text-xl font-semibold mb-2">
                {detail.title[lang]}
              </h4>
              {detail?.dates?.map((date, index) => (
                <div key={index} className="flex items-center gap-10">
                  <h5>{date.day[lang]}</h5>
                  <p>{date.time}</p>
                </div>
              ))}
            </>
            {mainUser && mainUser.role === "super-admin" && (
              <div className="absolute top-5 right-5">
                <button
                  className="px-2 py-1 bg-custom-red text-white rounded-md"
                  onClick={() => handleDelete(detail._id)}
                >
                  Delete
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  className="px-2 py-1 bg-custom-yellow rounded-md"
                  onClick={() => handleEdit(detail)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show the edit/create card if we're editing or creating */}
      {isEditing && (
        <Card
          data={currentDetail}
          onSave={handleSave}
          loading={loading}
          onCancel={() => setIsEditing(false)} // Close form on cancel
        />
      )}
    </div>
  );
};

export default DetailsManager;
