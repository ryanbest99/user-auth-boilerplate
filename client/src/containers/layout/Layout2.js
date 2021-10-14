import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../../helpers";
import Navbar from "../../components/Navbar/Navbar";

const Layout = ({ children, history }) => {
  const nav = () => (
    <ul style={{ border: "1px solid red" }}>
      <li>
        <Link to="/">Home</Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li>
            <Link to="/signup2">SignUp</Link>
          </li>
          <li>
            <Link to="/signin2">SignIn</Link>
          </li>
        </Fragment>
      )}

      {isAuth() && (
        <li>
          <span>Hello {isAuth().username}</span>
        </li>
      )}

      {isAuth() && (
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );

  return (
    <>
      {/* {nav()} */}
      <Navbar history={history} />
      <div>{children}</div>
    </>
  );
};

export default withRouter(Layout);
