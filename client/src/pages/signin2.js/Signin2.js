import React from "react";
// import { Redirect } from "react-router-dom";
import rocketImg from "../../assets/rocket.png";
import SigninForm from "./SigninForm";
import Layout from "../../containers/layout/Layout";
import Layout2 from "../../containers/layout/Layout2";
// import { isAuth } from "../../helpers";

const Signin2 = () => {
  return (
    <Layout2>
      {/* {isAuth() ? <Redirect to="/" /> : null} */}
      <div
        className="container"
        style={{ border: "1px solid red", maxWidth: "1072px" }}
      >
        <div className="row" style={{ marginTop: "30%" }}>
          <div className="col-md-5">
            <SigninForm />
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={rocketImg} alt="" />
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Signin2;
