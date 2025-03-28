import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setUser } from "../../features/Auth/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase";
import { async } from "@firebase/util";
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleSignin = async () => {
    setLoading(true);
    try {
      if (email.trim().length === 0 || password.trim().length === 0) {
        setLoading(false);
        alert("Enter valid credentials");
        return;
      }
      if (password.trim().length < 8) {
        setLoading(false);
        alert("Password length must be greater than 8");
        return;
      }

      const res = await axios.post(BASE_URL + "/users/signin", {
        email: email.trim(),
        password,
      });
      toast.success("Signin successfully", {
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
        setLoading(false);
        dispatch(setUser(res.data.data.user));
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

  const signupWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const fields = {
          name: user.providerData[0].displayName,
          email: user.providerData[0].email,
          password: null,
          phone: user.providerData[0].phoneNumber,
        };

        setLoading(true);
        try {
          const res = await axios.post(BASE_URL + "/users/using-google", {
            fields,
          });
          toast.success("Authenticate successfully  ", {
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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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
        <h1 className="text-title text-center text-xl">
          <b>Sign in</b>
        </h1>
        <div
          onClick={signupWithGoogle}
          className="flex p-2 cursor-pointer justify-center border-2 hover:bg-gray-100 items-center mb-5 space-x-4 mt-5"
        >
          {/* <FaFacebook className="text-3xl cursor-pointer" />
                    <FaGoogle className="text-3xl cursor-pointer" />
                    <FaTwitter className="text-3xl cursor-pointer" /> */}
          <img
            className="w-[40px]"
            src="https://images.prismic.io/elhard/8d25d604-ea29-4175-a0e1-af5625e86c5e_300221.png?auto=compress,format"
            alt="google"
          />
          <h1 className="text-xl font-semibold">Google</h1>
        </div>
        <p className="text-center text-xl">Or use your account</p>
        <div className="mt-5 group">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="p-3 border-2 border-gray rounded-2xl outline-none w-full focus:border-custom-yellow"
            placeholder="Enter Email"
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
          onClick={handleSignin}
          className="w-full mt-10 py-2 bg-custom-yellow duration-300 rounded-lg relative"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="">
              <Loader s={6} h={5} b={10} />
            </div>
          ) : (
            "Login"
          )}
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
