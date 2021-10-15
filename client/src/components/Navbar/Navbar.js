import styles from "./Navbar.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { FaFolderOpen, FaBriefcase } from "react-icons/fa";
import { BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { isAuth, signout } from "../../helpers";

const Navbar = ({ children, history }) => {
  const [showLists, setShowLists] = useState(false);
  const [show, setShow] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShow(document.body.getBoundingClientRect().top > scrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show, scrollPos]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    setShowLists(!showLists);
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 85,
    });
  };

  return (
    <>
      <nav className={`${styles.navbar} `}>
        <div
          className={`${styles.navCenter} ${
            show ? styles.active : styles.hidden
          }`}
        >
          <div className={styles.navHeader}>
            <h2>
              <Link to="/">Logo</Link>
            </h2>
            <button
              className={`${styles.navBtn} ${showLists && styles.hideNavBtn}`}
              onClick={() => {
                console.log(showLists);
                setShowLists(!showLists);
              }}
            >
              <BiMenuAltRight />
            </button>
          </div>
          <div className={styles.navListsBox}>
            <ul className={`${styles.navLists}`}>
              {!isAuth() && (
                <>
                  <li className={styles.navList}>
                    <Link to="/signup2">SignUp</Link>
                  </li>
                  <li className={styles.navList}>
                    <Link to="/signin2">SignIn</Link>
                  </li>
                </>
              )}
              {isAuth() && (
                <li className={styles.navList}>
                  <span>Hello {isAuth().username}</span>
                </li>
              )}
              {isAuth() && (
                <li className={styles.navList}>
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
          </div>
        </div>
        <aside
          className={`${styles.sidebar} ${showLists && styles.showSidebar}`}
        >
          <div
            className={styles.sidebarHeader}
            // style={{ border: "3px solid red" }}
          >
            <h2>logo</h2>
            {/* <img src={mylogo} alt="" className={styles.myLogo} /> */}
            <button
              className={styles.sideCloseBtn}
              onClick={() => {
                setShowLists(!showLists);
              }}
            >
              <CgClose />
            </button>
          </div>
          <div>
            <ul className={styles.sidebarLists}>
              <li className={styles.sidebarList}>
                <Link to="/">Home</Link>
              </li>
              {!isAuth() && (
                <>
                  <li className={styles.sidebarList}>
                    <Link to="/signup2">SignUp</Link>
                  </li>
                  <li className={styles.sidebarList}>
                    <Link to="/signin2">SignIn</Link>
                  </li>
                </>
              )}
              {isAuth() && (
                <>
                  <li className={styles.sidebarList}>
                    <span>Hello {isAuth().username}</span>
                  </li>
                  <li className={styles.sidebarList}>
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
                </>
              )}
            </ul>
          </div>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
