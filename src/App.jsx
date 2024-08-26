import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { useSelector } from "react-redux";
import Gallery from "./pages/Admin/Gallery";
import Banner from "./pages/Admin/Banner";
import Locations from "./pages/Admin/Locations";
import Offers from "./pages/Admin/Offers";

// import { useDispatch, useSelector } from "react-redux";
// import { setLanguage } from "./features/language/languageSlice";

function App() {
    const lang = useSelector((state) => state.language.lang);
    return (
        <div className="font-custom">
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
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/Faq" element={<Faq />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/hotel" element={<Hotel />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route
                            path="/tours/:category"
                            element={<SignleCategory />}
                        />
                        <Route
                            path="/transportation"
                            element={<Transportation />}
                        />
                        <Route path="/admin-cart" element={<AdminCart />} />
                        <Route
                            path="/admin-favourites"
                            element={<AdminFavourite />}
                        />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="tickets" element={<Tickets />} />
                            <Route path="categorys" element={<Categorys />} />
                            <Route path="tours" element={<ToursAdmin />} />
                            <Route path="users" element={<Users />} />
                            <Route path="hotels" element={<Hotels />} />

                            <Route path="aboutus" element={<AdminAboutus />} />
                            <Route path="gallery" element={<Gallery />} />
                            <Route path="banner" element={<Banner />} />
                            <Route path="locations" element={<Locations />} />
                            <Route path="offers" element={<Offers />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
