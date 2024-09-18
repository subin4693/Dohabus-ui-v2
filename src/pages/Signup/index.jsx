import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/Auth/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleSignup = async () => {
        setLoading(true);
        try {
            if (
                name.trim().length === 0 ||
                email.trim().length === 0 ||
                password.trim().length === 0
            ) {
                setLoading(false);
                toast.error(" Enter valid credentials ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            if (password.trim().length < 8) {
                setLoading(false);
                toast.error("Password length must be greater than 8", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const res = await axios.post(BASE_URL + "/users/signup", {
                name: name,
                email: email.trim(),
                password: password,
                number,
            });
            console.log(res.data.data);
            toast.success("User created successfully  ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            if (res) {
                // await new Promise((resolve) => setTimeout(resolve, 300000));
                dispatch(setUser(res.data.data.user));
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            setLoading(false);
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
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                // onSubmit={handleSignup}
                className="w-full max-w-md border-gray rounded-2xl p-10 shadow-2xl"
                action=""
            >
                {/* Logo section (if needed)
        <div className="w-40 flex justify-center items-center mx-auto">
          <img src={logo} alt="Logo" />
        </div> */}
                <h1 className="text-title text-center">
                    <b>Create Account</b>
                </h1>

                <div className="flex justify-center items-center mb-5 gap-5 space-x-4 mt-5">
                    <FaFacebook className="text-3xl cursor-pointer" />
                    <FaGoogle className="text-3xl cursor-pointer" />
                    <FaTwitter className="text-3xl cursor-pointer" />
                </div>
                <p className="text-center">Or use your account</p>
                <div className="mt-5 group">
                    <input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Name"
                    />
                </div>
                <div className="mt-5 group">
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Email"
                    />
                </div>
                <div className="mt-5 group">
                    <input
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                        }}
                        type="text"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Mobile number"
                    />
                </div>
                <div className="mt-5 group">
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Password"
                    />
                </div>

                {/*  <div className="mt-5">
                    <select className="p-3 border-gray outline-none border-2 border-gray-300 rounded-lg w-full mt-1 bg-white focus:border-blue-500 focus:ring-2 focus:ring-primary">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>*/}
                {/*<Button className={"mt-5 w-full h-12"}>
                    {" "}
                    <b>Signup</b>{" "}
                </Button>*/}
                <button
                    type="button"
                    onClick={handleSignup}
                    className="w-full mt-10 py-2 bg-custom-yellow duration-300 rounded-lg relative"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? (
                        <div className="">
                            <Loader s={6} h={5} b={10} />
                        </div>
                    ) : (
                        "Signup"
                    )}
                </button>

                <div className=" mt-5 text-center">
                    <p>
                        Already Have an account?{" "}
                        <Link to={"/signin"}>
                            {" "}
                            <b className="cursor-pointer"> Login</b>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
