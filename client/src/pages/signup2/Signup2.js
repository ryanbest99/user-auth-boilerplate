import React from "react";
import rocketImg from "../../assets/rocket.png";
import SignupForm from "./SignupForm";
import Layout from "../../containers/layout/Layout";
import Layout2 from "../../containers/layout/Layout2";

const Signup2 = ({ getUserInfo }) => {
  return (
    <Layout2>
      <div
        className="container "
        style={{ border: "1px solid red", maxWidth: "1072px" }}
      >
        <div
          className="row"
          style={{ border: "0px solid blue", marginTop: "30%" }}
        >
          <div className="col-md-5">
            <SignupForm getUserInfo={getUserInfo} />
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={rocketImg} alt="" />
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Signup2;
