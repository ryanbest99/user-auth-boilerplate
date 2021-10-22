import styles from "../home/Home.module.css";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "../signup2/TextField";
import { ToastContainer, toast } from "react-toastify";
import jwt from "jsonwebtoken";

const ResetPasswordForm = ({ match }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [valuess, setValuess] = useState({
    newPassword: "",
    token: "",
  });

  useEffect(() => {
    let token = match.params.token;
    console.log(token);
    if (token) {
      setValuess({ ...valuess, token, newPassword });
    }
  }, []);

  const validate = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const { token, newPassword } = valuess;

  const handleSubmit = async (values) => {
    const { password } = values;
    try {
      const res = await axios.put("/api/auth/users/resetpassword2", {
        resetPasswordLink: token,
        newPassword: password,
      });
      console.log("Password has been reset", res);

      setTimeout(() => {
        setIsClicked(true);
      }, 3000);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.err);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer />

      {isClicked ? <Redirect to="/signin2" /> : null}

      <Formik
        initialValues={{
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
            <h1 className="my-4 font-weight-bold .display-4">Reset Password</h1>
            <Form>
              <TextField label="New Password" name="password" type="password" />
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
              />
              <button
                className="btn btn-dark mt-3"
                type="submit"
                disabled={!formik.isValid}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                Submit
              </button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
