import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "../signup2/TextField";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, authenticate } from "../../helpers";

const ForgotPasswordForm = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const { email } = values;

    try {
      const res = await axios.post("/api/auth/users/forgetpassword", { email });
      console.log("Sent Message Successfully", res);

      //       authenticate(res, () => {
      //         setValues({ ...values, email: "", password: "" });
      //         toast.success(`Hey ${res.data.user.username}. Welcome Back!`);
      //       });
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
            <h1 className="my-4 font-weight-bold .display-4">
              Forgot Password
            </h1>
            <Form>
              <p
                style={{
                  marginTop: "0rem",
                  fontSize: "0.9rem",
                }}
              >
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email
              </p>
              <TextField label="Email" name="email" type="email" />
              <button
                className="btn btn-dark "
                type="submit"
                disabled={!formik.isValid}
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                Submit
              </button>
              <button className="btn btn-danger ml-3" type="reset">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
