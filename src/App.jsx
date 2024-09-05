import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import About from "./pages/About";
import SignleCategory from "./pages/SignleCategory";
import SingleTour from "./pages/SingleTour";
import Contact from "./pages/Contact";
import Hotel from "./pages/Hotel";
import Tours from "./pages/Tours";
import Cart from "./pages/Cart";
import Transportation from "./pages/Transportation";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import CreateBlog from "./pages/Create-Blog";
import Checkout from "./pages/Checkout";

import AdminDashboard from "./pages/Admin/Dashboard";
import Tickets from "./pages/Admin/Tickets";
import Categorys from "./pages/Admin/Categoryes";
import ToursAdmin from "./pages/Admin/Tours";
import Users from "./pages/Admin/Users";
import Favourites from "./pages/Favourites";
import Faq from "./pages/FAQ";
import AdminCart from "./pages/Admin/AdminCart";
import AdminFavourite from "./pages/Admin/AdminFavourite";
import Hotels from "./pages/Admin/Hotels";
import AdminAboutus from "./pages/Admin/Aboutus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "./pages/Admin/Gallery";
import Banner from "./pages/Admin/Banner";
import Locations from "./pages/Admin/Locations";
import Offers from "./pages/Admin/Offers";
import HotelBookings from "./pages/Admin/HotelBookings";
import OfferPromo from "./pages/Offer&Promotion";
import Guidelines from "./pages/Guidelines";
import TermandCond from "./pages/Term&Conditions";
import MICE from "./pages/MICE";
import Cruise from "./pages/Cruise";
import AdminTransportation from "./pages/Admin/Transportation";

import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "./features/language/languageSlice";
import { setUser } from "./features/Auth/userSlice";

function App() {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly

    const lang = useSelector((state) => state.language.lang);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        // Check if a language preference is stored in localStorage
        const storedLanguage = localStorage.getItem("language");

        if (storedLanguage) {
            // If a language is found in localStorage, use it to set the language in Redux
            dispatch(setLanguage(storedLanguage));
        } else {
            // If no language is found in localStorage, default to 'en' and dispatch it
            dispatch(setLanguage("en"));
        }
    }, []);
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/verify`, {
                    withCredentials: true,
                });
                console.log(response?.data?.data?.user); // Use response.data to access the data
                dispatch(setUser(response?.data?.data?.user));
            } catch (error) {
                console.error("Error verifying user:", error); // Log the error
            }
        };

        verify(); // Call verify on component mount
    }, []);
    return (
        <div className="font-custom cursor-default">
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/tours/:category/:singletour"
                            element={<SingleTour />}
                        />
                        <Route
                            path="/cart"
                            element={
                                user?.email ? (
                                    <Cart />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                        <Route
                            path="/checkout/:id"
                            element={
                                user?.email ? (
                                    <Checkout />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                        <Route
                            path="/favourites"
                            element={
                                user?.email ? (
                                    <Favourites />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                        <Route path="/Faq" element={<Faq />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/hotel" element={<Hotel />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route
                            path="/tours/:category"
                            element={<SignleCategory />}
                        />

                        <Route path="/offer-promo" element={<OfferPromo />} />
                        <Route path="/guidelines" element={<Guidelines />} />
                        <Route path="/mice" element={<MICE />} />
                        <Route path="/cruise" element={<Cruise/>} />

                        <Route
                            path="termandconditions"
                            element={<TermandCond />}
                        />

                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:id" element={<SingleBlog />} />
                        <Route
                            path="/blogs-create"
                            element={
                                user?.email ? (
                                    <CreateBlog />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />

                        <Route
                            path="/transportation"
                            element={<Transportation />}
                        />
                        <Route
                            path="/admin-cart"
                            element={
                                user && user.role === "admin" ? (
                                    <AdminCart />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                        <Route
                            path="/admin-favourites"
                            element={
                                user && user.role === "admin" ? (
                                    <AdminFavourite />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                user && user.role === "admin" ? (
                                    <AdminLayout />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        >
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="tickets" element={<Tickets />} />
                            <Route path="categorys" element={<Categorys />} />
                            <Route path="tours" element={<ToursAdmin />} />
                            <Route path="users" element={<Users />} />
                            <Route path="hotels" element={<Hotels />} />
                            <Route
                                path="transportations"
                                element={<AdminTransportation />}
                            />
                            <Route path="aboutus" element={<AdminAboutus />} />
                            <Route path="gallery" element={<Gallery />} />
                            <Route path="banner" element={<Banner />} />
                            <Route path="locations" element={<Locations />} />
                            <Route path="offers" element={<Offers />} />
                            <Route
                                path="hotel-bookings"
                                element={<HotelBookings />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />{" "}
        </div>
    );
}

export default App;
