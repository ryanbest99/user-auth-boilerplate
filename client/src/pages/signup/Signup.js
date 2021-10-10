import "./Signup.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../containers/layout/Layout";
import { isAuth } from "../../helpers";

const Signup = () => {
  const [values, setValues] = useState({
    username: "abc1",
    email: "abc1@gmail.com",
    password: "12345678",
    buttonText: "Submit",
  });

  const { username, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(name);
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const res = await axios.post("/api/auth/register2", {
        username,
        email,
        password,
      });
      console.log("SignUp Success", res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.err);
      // toast.error(err.response.data.error);
      toast.error(error.response.data.err);
    }
  };

  const signupForm = () => (
    <div className="form-container">
      <form className="form">
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChange("username")}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
    </div>
  );

  return (
    <>
      <Layout>
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        {signupForm()}
      </Layout>
    </>
  );
};

export default Signup;
