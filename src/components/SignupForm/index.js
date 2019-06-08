// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// styles
import 'components/SignupForm/SignupForm.scss';

// components
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import ModalBox from 'components/ModalBox';

//  string constants
import { SIGN_UP_STRING } from 'constants/constantStrings';

/**
/**
 * This is a function which return the SignupForm component
 * @param {*} n - mixed parameter types*
 * @return {component}
 * @example
 * foo = (props) => {}
 */
const SignupForm = (props) => {
  const {
    onChangeHandler, email, username, password,
    confirmPassword, onSubmitHandler, emailError, usernameError,
    passwordError, confirmPasswordError, signupMessageState, isSigningUp, backdropId,
  } = props;

  return (
    // Signup form enclosed inside the modal
    <ModalBox show title={SIGN_UP_STRING} {...props} backdropId={backdropId}>
      <div>
        <form className="signupForm" id="signupForm">
          <InputBox
            name="email"
            inputType="email"
            handleChange={onChangeHandler}
            placeholder="email"
            inputClass="signupForm__input"
            value={email}
          >
            <br />
            <span id="signupForm__input__error__email" className="signupForm__input__error">
              <small>{emailError}</small>
            </span>
          </InputBox>
          <InputBox
            name="username"
            inputType="text"
            handleChange={onChangeHandler}
            placeholder="username"
            inputClass="signupForm__input"
            value={username}
          >
            <br />
            <span id="signupForm__input__error__username" className="signupForm__input__error">
              <small>{usernameError}</small>
            </span>
          </InputBox>
          <InputBox
            name="password"
            inputType="password"
            handleChange={onChangeHandler}
            placeholder="password"
            inputClass="signupForm__input"
            value={password}
          >
            <br />
            <span id="signupForm__input__error__password" className="signupForm__input__error">
              <small>{passwordError}</small>
            </span>
          </InputBox>
          <InputBox
            name="confirmPassword"
            inputType="password"
            handleChange={onChangeHandler}
            placeholder="confirm password"
            inputClass="signupForm__input"
            value={confirmPassword}
          >
            <br />
            <span id="signupForm__input__error__confirmPassword" className="signupForm__input__error">
              <small>{confirmPasswordError}</small>
            </span>
          </InputBox>
          <br />
          <span className="signupForm__signUpMessage">{signupMessageState}</span>
          {isSigningUp && <div className="signupForm__loader" />}
          <Button
            id="signupForm__button"
            btnClass="signupForm__button"
            btnName={SIGN_UP_STRING}
            btnEvent={onSubmitHandler}
          />
        </form>
      </div>
    </ModalBox>
  );
};

// prop types validations
SignupForm.propTypes = {
  onChangeHandler: PropTypes.func,
  email: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  emailError: PropTypes.string,
  usernameError: PropTypes.string,
  passwordError: PropTypes.string,
  confirmPasswordError: PropTypes.string,
  signupMessageState: PropTypes.string,
  isSigningUp: PropTypes.bool,
  backdropId: PropTypes.string,
};

// default props
SignupForm.defaultProps = {
  onChangeHandler: () => { },
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  onSubmitHandler: () => { },
  emailError: '',
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
  signupMessageState: '',
  isSigningUp: false,
  backdropId: 'signupModal',
};

export default SignupForm;
