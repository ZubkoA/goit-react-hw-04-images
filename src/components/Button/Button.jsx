import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ handleClick, title }) => {
  return (
    <button type="button" className={css.Button} onClick={handleClick}>
      {title}
    </button>
  );
};
Button.propType = {
  title: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
export default Button;
