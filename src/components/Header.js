import React from 'react'
import PropTypes from "prop-types";


const Header = ({ title }) => {

  return (
    <header className="header">
      <h1>{title}</h1>
      <p>To Hold Or Not To Hold</p>
    </header>
  );
};

Header.defaultProps = {
  title: "Title",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
