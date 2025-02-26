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
import TransportationBookings from "./pages/Admin/TransportationBookings";
import OfferBanner from "./pages/Admin/OfferBanner";
import AdminCruise from "./pages/Admin/Cruise";

import AdminBlog from "./pages/Admin/Blogs";
import GuideLine from "./pages/Admin/Guideline";

import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "./features/language/languageSlice";
import { setUser } from "./features/Auth/userSlice";
import Invoice from "./pages/Invoice";
import Invoices from "./pages/Admin/Invoices";
import Subscribers from "./pages/Admin/Subscribers";
import AdminPopulorCruise from "./pages/Admin/Populor-Cruise";
import FAQ from "./pages/Admin/FAQ";
import TermsAndCondition from "./pages/Admin/TermsAndConditions";

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

  return <div className="font-custom cursor-default overflow-x-hidden"></div>;
}

export default App;
