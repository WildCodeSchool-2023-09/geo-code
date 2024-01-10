import React from "react";
import PropTypes from "prop-types";
import "../scss/components/breadcrumb.scss";

export default function Breadcrumb({ data, currentname }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ul className="breadcrumb_ul">
        {data.map((item) => (
          <li className="breadcrumb_ul_li">
            <a className="breadcrumb_ul_li_a" href={item.link}>
              {item.name}
            </a>
            <p className="breadcrumb_ul_li_p">{">"}</p>
          </li>
        ))}
        <li aria-current="page" className="breadcrumb_ul_li_current">
          <a
            href="#here"
            className="breadcrumb_ul_current_a"
            aria-current={currentname}
          >
            {currentname}
          </a>
        </li>
      </ul>
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: PropTypes.func.isRequired,
  currentname: PropTypes.string.isRequired,
};
