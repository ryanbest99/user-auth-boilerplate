import styles from "../home/Home.module.css";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../containers/layout/Layout";
import Layout2 from "../../containers/layout/Layout2";
import { Redirect } from "react-router";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    username: "",
    token: "",
    show: true,
  });

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let token = match.params.token;
    console.log(token);
    let { username } = jwt.decode(token);
    console.log(username);
    if (token) {
      setValues({ ...values, username, token });
    }
  }, []);

  const { username, token, show } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const res = await axios.post("/api/auth/users/account-activation", {
        token,
      });
      console.log("Sign Up Success");
      console.log(res);
      toast.success(res.data.message);
      toast.success("You will be moved to Login page in 3 seconds");
      setTimeout(() => {
        setIsClicked(true);
      }, 3000);
    } catch (err) {
      console.log("Sign Up False");
      console.log(err);
      console.log("err response: ", err.response);
      toast.error(err.response.data.err);
    }
  };

  const activationLink = () => (
    <section className={styles.hero}>
      <div className={styles.heroSection}>
        <h1>Hello {username}, Are you ready to activate your account?</h1>
        <br />
        <button onClick={handleSubmit} className={styles.btn}>
          Activate Account
        </button>
      </div>
      <div className={styles.animation}>
        <img src="/images/background.png" alt="hero-img" />
      </div>
    </section>
  );

  return (
    <>
      {/* <Layout2> */}
      {isClicked ? <Redirect to="/signin2" /> : null}
      <div>{activationLink()}</div>
      <ToastContainer />
      {/* </Layout2> */}
    </>
  );
};

export default Activate;
