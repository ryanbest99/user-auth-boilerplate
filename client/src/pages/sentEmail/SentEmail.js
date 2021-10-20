import styles from "../home/Home.module.css";
import React, { useState } from "react";
import Layout from "../../containers/layout/Layout";
import Layout2 from "../../containers/layout/Layout2";

const SentEmail = ({ user }) => {
  console.log(user);

  const { username, email } = user;

  return (
    <Layout2>
      <section className={styles.hero}>
        <div className={styles.heroSection}>
          {/* <h1>Please Check</h1> */}
          <h1>A verification email has been sent to:</h1>
          {/* <h1>your email</h1> */}
          <br />
          <h3>{email}</h3>
        </div>
        <div className={styles.animation}>
          <img src="/images/background.png" alt="hero-img" />
        </div>
      </section>
    </Layout2>
  );
};

export default SentEmail;
