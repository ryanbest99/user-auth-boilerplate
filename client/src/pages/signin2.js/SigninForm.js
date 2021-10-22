import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "../signup2/TextField";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, authenticate } from "../../helpers";

const SigninForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;

    try {
      const res = await axios.post("/api/auth/users/login", {
        email,
        password,
      });
      console.log("Login Success", res);

      authenticate(res, () => {
        setValues({ ...values, email: "", password: "" });
        toast.success(`Hey ${res.data.user.username}. Welcome Back!`);
      });

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

      {isAuth() ? <Redirect to="/" /> : null}
      <Formik
        initialValues={values}
        validationSchema={validate}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        // onSubmit={(values) => console.log(values)}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
            <Form>
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <p
                style={{
                  marginTop: "0rem",
                  fontSize: "0.9rem",
                }}
              >
                <Link to="/forgotpassword">Forgot Password</Link>
              </p>
              <button
                className="btn btn-dark "
                type="submit"
                disabled={!formik.isValid}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                Login
              </button>
              <button className="btn btn-danger ml-3" type="reset">
                Reset
              </button>
              <p style={{ marginTop: "1rem" }}>
                Don't have an account? <Link to="/signup2">Sign Up</Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SigninForm;
