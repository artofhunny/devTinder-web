import React, { useState } from "react";
import logo from "../assets/dev-tinder-logo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const [email, setEmail] = useState("anushka@gmail.com");
  const [password, setPassword] = useState("Anushka@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    emailId: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const signupSchema = Yup.object({
    firstName: Yup.string().min(3).required("First name is required"),
    lastName: Yup.string().min(3).required("Last name is required"),
    emailId: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    },
    validationSchema: isLoginForm ? loginSchema : signupSchema,
    onSubmit: async (values) => {
      try {
        setGlobalError(null);

        if (isLoginForm) {
          const res = await axios.post(
            BASE_URL + "/login",
            {
              emailId: values.emailId,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );

          dispatch(addUser(res?.data?.data));
          navigate("/");
        } else {
          const res = await axios.post(
            BASE_URL + "/signup",
            {
              firstName: values.firstName,
              lastName: values.lastName,
              emailId: values.emailId,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );

          dispatch(addUser(res?.data?.data));
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
        setGlobalError(error.response?.data?.message|| error.response?.data || "Something went wrong");
      }
    },
  });

  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/login",
  //       {
  //         emailId: email,
  //         password,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     dispatch(addUser(res.data.data));
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/signup",
  //       {
  //         firstName,
  //         lastName,
  //         emailId: email,
  //         password,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     dispatch(addUser(res.data.data));
  //     navigate("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const firstValidationError = Object.values(formik.errors)[0];

  return (
    <div className="flex justify-center py-16">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center">
            <img src={logo} className="w-20 rounded-full" alt="" />
            <p className="text-2xl font-bold mt-2">DevTinder</p>
            <p className="font-medium text-gray-600">
              Connect. Code. Collaborate
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col items-center mt-4 w-full">
            <h1 className="text-3xl font-bold">
              {isLoginForm ? "Login" : "SignUp"}
            </h1>
            <div className="w-full">
              {!isLoginForm && (
                <>
                  <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="firstName"
                    />
                  </fieldset>
                  <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </fieldset>{" "}
                </>
              )}
              <fieldset className="fieldset w-full mt-3">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input w-full"
                  name="emailId"
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input w-full"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </fieldset>

              {(firstValidationError || globalError) && <p className="text-red-600 font-medium mt-2">{firstValidationError || globalError}</p>}

              <button
                // onClick={isLoginForm ? handleLogin : handleSignUp}
                type="submit"
                className="px-8 w-full mt-2 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
              >
                Log In
              </button>

              <div>
                <p
                  onClick={() => setIsLoginForm(!isLoginForm)}
                  className="mt-4 font-medium cursor-pointer"
                >
                  {isLoginForm
                    ? "New user? Create an account"
                    : "Existing user? Login to your account"}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
