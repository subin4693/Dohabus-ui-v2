import React, { useState, useEffect } from "react";
import useFirebaseUpload from "../../../hooks/use-firebaseUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import Card from "./Card";
import { toast } from "react-toastify";

const Transportation = () => {
	const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
	const [image, setImage] = useState(null);
	const lang = useSelector((state) => state.language.lang);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedData, setSelectedData] = useState(null);
	const [title, setTitle] = useState({ en: "", ar: "" });
	const [description, setDescription] = useState({ en: "", ar: "" });
	const [places, setPlaces] = useState([{ en: "", ar: "" }]);
	const [file, setFile] = useState(null);

	const [transportations, setTransportations] = useState([]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFile(file); // Set the file state to trigger Firebase upload
		}
	};

	const handleCreate = async (isEdit) => {
		try {
			let updatedFleet;
			if (isEdit) {
				// Edit an existing transportation fleet
				const res = await axios.put(
					`${BASE_URL}/transportations/${selectedData._id}`,
					{
						title,
						places,
						coverImage: image,
					},
				);
				updatedFleet = res.data.data.transportation;
				console.log(updatedFleet);

				// Update the fleet in the state
				setTransportations((prevTransportations) =>
					prevTransportations.map((fleet) =>
						fleet._id === updatedFleet._id ? updatedFleet : fleet,
					),
				);

				toast.success("Transportation fleet updated", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			} else {
				// Create a new transportation fleet
				if (!file) {
					return toast.warn("Please select an image", {
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

				if (!image) {
					return toast.warn("Image is uploading wait a second", {
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
				const res = await axios.post(`${BASE_URL}/transportations`, {
					title,
					places,
					coverImage: image,
				});
				updatedFleet = res.data.data.transportation;
				console.log(updatedFleet);

				// Add the new fleet to the end of the state array
				setTransportations((prevTransportations) => [
					...prevTransportations,
					updatedFleet,
				]);

				toast.success("New transportation fleet created", {
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

			// Close the modal or form
			setIsOpen(false);

			// Reset form fields
			setTitle({ en: "", ar: "" });
			setPlaces([{ en: "", ar: "" }]); // Resetting places array to a single empty object
			setImage(null);
			setSelectedData(null);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong. Please try again later", {
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

	const handleDialog = (data = null) => {
		if (data) {
			// Edit mode
			console.log(data);
			setSelectedData(data);
			setTitle(data.title);
			setPlaces(data.places);
			setImage(data.coverImage);
		} else {
			// Create mode
			setSelectedData(null);
			setTitle({ en: "", ar: "" });
			setPlaces([{ en: "", ar: "" }]);
			setImage(null);
		}
		setIsOpen((prev) => !prev);
	};

	const switchActive = async (id) => {
		try {
			// Edit an existing transportation fleet
			const res = await axios.patch(`${BASE_URL}/transportations/${id}`);
			console.log(res.data.data);
			let updatedFleet = res.data.data;
			console.log(updatedFleet);

			// Update the fleet in the state
			setTransportations((prevTransportations) =>
				prevTransportations.map((fleet) =>
					fleet._id === updatedFleet._id ? updatedFleet : fleet,
				),
			);
		} catch (error) {
			toast.error("Something went wrong. Please try again later", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			console.log(error);
		}
	};

	const { progress, error, downloadURL } = useFirebaseUpload(file);
	useEffect(() => {
		if (downloadURL) {
			setImage(downloadURL); // Update formData with the Firebase download URL
		}
	}, [downloadURL]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(
					BASE_URL + "/transportations/admin",
				);
				console.log(res.data.data.transportations);
				setTransportations(res.data.data.transportations);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, []);
	return (
		<div>
			{isOpen && (
				<div className="fixed inset-0 bg-white bg-opacity-50 z-30 backdrop-blur-sm flex justify-center items-center">
					<div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full md:w-[800px] gap-4 p-5 border shadow-xl">
						<div className="flex-1 flex items-center justify-center">
							<label className="flex flex-col justify-center items-center cursor-pointer h-full">
								{!image ? (
									<>
										<IoCameraOutline className="w-12 h-12 text-gray-500" />
										<input
											type="file"
											className="hidden"
											id="coverImage"
											accept="image/*"
											onChange={handleImageChange}
										/>
									</>
								) : (
									<img
										src={image}
										alt="Selected"
										className="w-full h-full object-cover rounded-md"
									/>
								)}
								{progress > 0 && progress !== 100 && (
									<p>Upload progress: {progress}%</p>
								)}
								{error && (
									<p className="text-red-500">
										Error: {error.message}
									</p>
								)}
							</label>
						</div>
						<div className="flex-1 space-y-5">
							{/* Title in English */}
							<input
								type="text"
								value={title.en}
								onChange={(e) =>
									setTitle((prev) => ({
										...prev,
										en: e.target.value,
									}))
								}
								placeholder="Title (English)"
								className="w-full p-2 border border-black rounded-lg outline-none"
							/>

							{/* Title in Arabic */}
							<input
								dir="rtl"
								type="text"
								value={title.ar}
								onChange={(e) =>
									setTitle((prev) => ({
										...prev,
										ar: e.target.value,
									}))
								}
								placeholder="العنوان (بالعربية)" // Arabic for 'Title'
								className="w-full p-2 border border-black rounded-lg outline-none"
							/>

							{/* Places Array Inputs */}
							{places?.map((place, index) => (
								<div key={index} className="space-y-2">
									{/* Place in English */}
									<input
										type="text"
										value={place.en}
										onChange={(e) => {
											const updatedPlaces = [...places];
											updatedPlaces[index].en =
												e.target.value;
											setPlaces(updatedPlaces);
										}}
										placeholder="Place (English)"
										className="w-full  p-2 border border-black rounded-lg outline-none resize-none"
									/>

									{/* Place in Arabic */}
									<input
										type="text"
										dir="rtl"
										value={place.ar}
										onChange={(e) => {
											const updatedPlaces = [...places];
											updatedPlaces[index].ar =
												e.target.value;
											setPlaces(updatedPlaces);
										}}
										placeholder="المكان (بالعربية)" // Arabic for 'Place'
										className="w-full  p-2 border border-black rounded-lg outline-none resize-none"
									/>

									{/* Remove Place Button */}
									<button
										className="text-red-500"
										onClick={() => {
											const updatedPlaces = places.filter(
												(_, i) => i !== index,
											);
											setPlaces(updatedPlaces);
										}}
									>
										Remove Place
									</button>
								</div>
							))}

							{/* Add New Place Button */}
							<button
								className="px-3 py-1 bg-green-500 text-white rounded-md"
								onClick={() =>
									setPlaces((prev) => [
										...prev,
										{ en: "", ar: "" },
									])
								}
							>
								Add Place
							</button>

							<div className="flex gap-2">
								<button
									className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
									onClick={() => handleDialog()}
								>
									Close
								</button>

								{selectedData ? (
									<button
										className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
										onClick={() => handleCreate(true)}
									>
										Update
									</button>
								) : (
									<button
										className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
										onClick={() => handleCreate(false)}
									>
										Create
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-subtitle font-bold">Transportation</h1>
					<p className="text-small text-red">
						Manage your tour Transportation
					</p>
				</div>
				<div>
					<button
						className="px-5 bg-custom-yellow py-2 rounded-md duration-300 hover:bg-black hover:text-white"
						onClick={() => handleDialog()}
					>
						Create Transportation
					</button>
				</div>
			</div>
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 flex-wrap">
				{transportations.map((card) => (
					<Card
						key={card._id}
						transid={card._id}
						title={card.title[lang]}
						places={card.places}
						lang={lang}
						imageUrl={card.coverImage}
						onClick={() => handleDialog(card)}
						switchActive={switchActive}
						isActive={card.isActive}
					/>
				))}
			</div>
		</div>
	);
};

export default Transportation;
