import React from "react";
import rocketImg from "../../assets/rocket.png";
import ResetPasswordForm from "./ResetPasswordForm";
import Layout2 from "../../containers/layout/Layout2";

const ResetPassword = ({ match }) => {
  return (
    <Layout2>
      <div
        className="container "
        style={{
          border: "0px solid red",
          maxWidth: "1072px",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="row">
          <div className="col-md-5">
            <ResetPasswordForm match={match} />
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={rocketImg} alt="" />
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default ResetPassword;
