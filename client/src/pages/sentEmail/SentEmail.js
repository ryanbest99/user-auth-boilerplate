import React, { useState } from "react";
import Layout from "../../containers/layout/Layout";

const SentEmail = ({ user }) => {
  console.log(user);

  const { username, email } = user;

  return (
    <Layout>
      <h1>
        Welcome {username}!! A verification email has been sent to : {email} !
        Please check your email!{" "}
      </h1>
    </Layout>
  );
};

export default SentEmail;
