import React from "react";
import rocketImg from "../../assets/rocket.png";
import SignupForm from "./SignupForm";
import Layout from "../../containers/layout/Layout";

const Signup2 = ({ getUserInfo }) => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <SignupForm getUserInfo={getUserInfo} />
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={rocketImg} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup2;
