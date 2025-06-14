import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = (props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textColor, textDecoration : props.textDecoration }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;

