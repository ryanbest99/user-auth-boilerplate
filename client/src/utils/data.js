import React from "react";
import { FaFolderOpen, FaBriefcase } from "react-icons/fa";
import { BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";

export const lists = [
  {
    id: 0,
    url: "#about",
    text: "Home",
    icon: <BsPersonFill />,
  },
  {
    id: 1,
    url: "#about",
    text: "Login",
    icon: <BsPersonFill />,
  },
  {
    id: 2,
    url: "#experience",
    text: "Register",
    icon: <FaBriefcase />,
  },
];

export const socialIcons = [
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/ryan-park-720aa420b",
  },
  {
    icon: <FaGithub />,
    url: "https://github.com/ryanbest99",
  },
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/",
  },
  {
    icon: <FaTwitter />,
    url: "https://www.linkedin.com/in/ryan-park-720aa420b",
  },
];
