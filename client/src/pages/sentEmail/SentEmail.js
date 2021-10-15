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
          <h1>Welcome {username}</h1>
          <br />
          <p>
            Please <span className={styles.email}>check </span> your email to
            register your account :
            <span className={styles.email}> {email} </span>
          </p>
        </div>
        <div className={styles.animation}>
          <img src="/images/background.png" alt="hero-img" />
        </div>
      </section>
    </Layout2>
  );
};

export default SentEmail;
