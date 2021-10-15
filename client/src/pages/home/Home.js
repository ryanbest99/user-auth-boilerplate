import styles from "./Home.module.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import Layout from "../../containers/layout/Layout";
import Layout2 from "../../containers/layout/Layout2";
// import { socialIcons } from "../../utils/data";
import { isAuth, signout } from "../../helpers";
// import Navbar from "../../components/Navbar/Navbar";

const Home = ({ history }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsClicked(true);
  };

  return (
    <>
      {isClicked ? <Redirect to="/signup2" /> : null}
      <Layout2>
        <section className={styles.hero}>
          <div className={styles.heroSection}>
            {/* <p>If you like it, please give me a star</p> */}

            {!isAuth() && (
              <>
                <h1>USER AUTH</h1>
                <h1>BOILERPLATE</h1>
                <br />
                <p>
                  {" "}
                  This is User Auth Boilerplate. <br />
                  If you like it, please give me a star
                </p>
                <button className={styles.btn} onClick={handleClick}>
                  Get Started
                </button>
              </>
            )}

            {isAuth() && (
              <>
                <h1>Welcome Back</h1>
                <h1>{isAuth.username}</h1>
                <br />
                <p>
                  You are signed-in. If you want to sign-out, please hit "sign
                  out" button
                </p>
                <button
                  className={styles.btn}
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
          <div className={styles.animation}>
            <img src="/images/background.png" alt="hero-img" />
          </div>
        </section>
      </Layout2>
    </>
  );
};

export default Home;
