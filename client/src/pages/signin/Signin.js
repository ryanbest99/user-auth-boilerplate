import "../signup/Signup.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../containers/layout/Layout";
import { authenticate, isAuth } from "../../helpers";

const Signin = () => {
  const [values, setValues] = useState({
    email: "abc1@gmail.com",
    password: "12345678",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(name);
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log("Login Success", res);
      authenticate(res, () => {
        setValues({ ...values, username: "", email: "", password: "" });
        toast.success(`Hey ${res.data.user.username}. Welcome Back!`);
      });
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.err);
      // toast.error(err.response.data.error);
      setValues({ ...values });
      toast.error(error.response.data.err);
    }
  };

  const signinForm = () => (
    <div className="form-container">
      <form className="form">
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
        {signinForm()}
      </Layout>
    </>
  );
};

export default Signin;
