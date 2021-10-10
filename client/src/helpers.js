import cookie from "js-cookie";

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, { expires: 1 });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, { expires: 1 });
  }
};

// read cookie
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set user-info in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (res, next) => {
  console.log("Authenticate helper on signin response", res);
  setCookie("token", res.data.token);
  setLocalStorage("user", res.data.user);
  next();
};

// access user-info from localstorage
export const isAuth = () => {
  if (window !== "undefined ") {
    // console.log("good1");
    const checkCookie = getCookie("token");
    // console.log(checkCookie);
    if (checkCookie) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};
