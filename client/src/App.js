import "./index.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import Layout from "./containers/layout/Layout";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Signup2 from "./pages/signup2/Signup2";
import Signin from "./pages/signin/Signin";
import Signin2 from "./pages/signin2.js/Signin2";
import SentEmail from "./pages/sentEmail/SentEmail";
import Activate from "./pages/activate/Activate";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  const [user, setUser] = useState(null);

  console.log("app");

  const getUserInfo = (value) => {
    console.log("line 19 user Value: ", value);
    if (value !== undefined) {
      return setUser(value);
    }
    console.log("line 22 user: ", user);
  };

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/signup2" component={Signup2} /> */}
        <Route
          exact
          path="/signup2"
          render={() => <Signup2 getUserInfo={getUserInfo} />}
        />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signin2" component={Signin2} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route
          exact
          path="/auth/resetpassword/:token"
          component={ResetPassword}
        />
        <Route exact path="/auth/activate/:token" component={Activate} />
        {user && (
          <Route
            exact
            path="/sentemail"
            render={() => <SentEmail user={user} />}
          />
        )}
      </Switch>
    </HashRouter>
  );
};

export default App;
