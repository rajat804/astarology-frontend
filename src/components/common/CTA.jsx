// components/common/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";
const CTA = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={
      "inline-flex items-center gap-3 px-5 py-2 rounded-2xl font-semibold shadow-md text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition " +
      className
    }
  >
    <Link to={'/contact'}>
     {children}
    </Link>
  </button>
);

export default CTA;