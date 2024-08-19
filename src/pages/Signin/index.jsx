import React from "react";
// import Button from "../../components/Button";
import logo from "../../assets/log.png";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                className="w-full max-w-md border-gray rounded-2xl p-10 shadow-2xl"
                action=""
            >
                {/* Logo section (if needed)
        <div className="w-40 flex justify-center items-center mx-auto">
          <img src={logo} alt="Logo" />
        </div> */}
                <h1 className="text-title text-center">
                    <b>Sign in</b>
                </h1>
                <div className="flex justify-center items-center mb-5 gap-5 space-x-4 mt-5">
                    <FaFacebook className="text-3xl cursor-pointer" />
                    <FaGoogle className="text-3xl cursor-pointer" />
                    <FaTwitter className="text-3xl cursor-pointer" />
                </div>
                <p className="text-center">Or use your account</p>
                <div className="mt-5 group">
                    <input
                        type="text"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Email"
                    />
                </div>
                <div className="mt-5 group">
                    <input
                        type="text"
                        className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
                        placeholder="Enter Password"
                    />
                </div>
                {/* <div className="mt-5">
                    <select className="p-3 border-gray outline-none border-2 border-gray-300 rounded-lg w-full mt-1 bg-white focus:border-blue-500 focus:ring-2 focus:ring-primary">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>*/}
                {/*<Button className={"mt-5 w-full h-12"}>
                    {" "}
                    <b>Login</b>{" "}
                </Button>
*/}{" "}
                <button
                    type="button"
                    className="w-full mt-10 py-2 bg-custom-yellow hover:bg-black hover:text-white duration-300 rounded-lg "
                >
                    Login
                </button>
                <div className=" mt-5 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to={"/signup"}>
                            {" "}
                            <b className="cursor-pointer"> Signup</b>
                        </Link>{" "}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signin;
