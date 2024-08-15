import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import About from "./pages/About";
import SignleCategory from "./pages/SignleCategory";
import SingleTour from "./pages/SingleTour";
import Contact from "./pages/Contact";
import Hotel from "./pages/Hotel";
import Tours from "./pages/Tours";

function App() {
    return (
        <div className="font-inter">
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        {/* <Route
                            path="/single-category"
                            element={<SignleCategory />}
                        /> */}
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/hotel" element={<Hotel />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route
                            path="/tours/:category"
                            element={<SignleCategory />}
                        />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
