import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
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
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="tickets" element={<Tickets />} />
                            <Route path="categorys" element={<Categorys />} />
                            <Route path="tours" element={<ToursAdmin />} />
                            <Route path="users" element={<Users />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
