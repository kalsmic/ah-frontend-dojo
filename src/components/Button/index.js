// React libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

const Button = (props) => {
  // Destructure props
  const {
    btnClass, btnName, btnEvent, disabled
  } = props;

  return (

    <button
      className={btnClass}
      type="button"
      onClick={btnEvent}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
};

// Default proptypes
Button.defaultProps = {
  disabled: false,
};

// Props validation
Button.propTypes = {
  disabled: PropTypes.bool,
  btnName: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  btnEvent: PropTypes.func.isRequired,

};
export default Button;
