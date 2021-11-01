import styles from "../home/Home.module.css";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "./TextField";
import { ToastContainer, toast } from "react-toastify";

const SignupForm = ({ getUserInfo }) => {
  const [isClicked, setIsClicked] = useState(false);

  const validate = Yup.object({
    username: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const { username, email, password } = values;
    getUserInfo(values);

    try {
      const res = await axios.post("/api/auth/users/register2", {
        username,
        email,
        password,
      });
      console.log("SignUp Success", res);
      setIsClicked(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.err);
      toast.error(error.response.data.err);
    }
  };

  return (
    <>
      <ToastContainer />

      {isClicked ? <Redirect to="/sentEmail" /> : null}

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        // onSubmit={(values) => console.log(values)}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
            <Form>
              <TextField label="Username" name="username" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <button
                className="btn btn-dark mt-3"
                type="submit"
                disabled={!formik.isValid}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                Register
              </button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">
                Reset
              </button>
              <p style={{ marginTop: "1rem" }}>
                Already have an account? <Link to="/signin2">Login</Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
