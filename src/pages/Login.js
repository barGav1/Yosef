import React, { useState } from "react";
import resumeIcon from "../Files/Resume_icon.png";
import "../styles/Home.css";
import api from "../api";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const registered = queryParams.get("registered");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginUser = async (user) => {
    try {
      const response = await api.post("/login/", user, {
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status === 200) {
        // Set cookies manually in the browser
        Cookies.set("userId", response.data.user.id, {
          path: "/",
          sameSite: "Lax",
        });
        // Add a small delay before redirecting
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 404) {
        setError("User does not exist, please register");
      } else if (error.response && error.response.status === 401) {
        setError("Wrong Password");
      } else {
        setError("Other login error");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: formData.email,
      password: formData.password,
    };
    await loginUser(user);
  };

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="h-16 w-auto" src={resumeIcon} alt="" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                {registered === "true" && (
                  <h1>Registration complete, Please Login to continue!</h1>
                )}
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {error && <p className="text-red-600">{error}</p>}
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        onChange={handleRememberMe}
                        checked={rememberMe}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="./ForgotPass"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="./Register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
