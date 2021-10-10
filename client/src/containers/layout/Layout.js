import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../../helpers";

const Layout = ({ children, history }) => {
  const nav = () => (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/signup2">SignUp2</Link>
          </li>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signin2">SignIn2</Link>
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
      {nav()}
      <div>{children}</div>
    </>
  );
};

export default withRouter(Layout);
