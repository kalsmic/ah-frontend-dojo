// react libraries
import React, { Component } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import SignupForm from 'components/SignupForm';

// actions
import registerUserActions from 'store/actions/registerUserActions';

// constants
import { SIGNUP_SUCCESS_MESSAGE, CONFIRM_PASSWORD_ERROR } from 'constants/constantStrings';

export class SignupUser extends Component {
  /**
  * @type {*} n
  */
  static propTypes = {
    signUp: PropTypes.func.isRequired,
    signupSuccess: PropTypes.string,
    signupError: PropTypes.shape({
      errors: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
      }),
    }),
    isSigningUp: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
  };

  /**
  * @type {*} n
  */
  static defaultProps = {
    signupError: { errors: { username: '', email: '', password: '' } },
    signupSuccess: '',
    isSigningUp: false,
  };


  /**
   * This is a function where the conponent state is initialized
   * @@type {*} n
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  /**
   * This is a function which handles onclick events for the
   * button on the signup form
   * @param {event} - An event param*
   * @example
   * on-submission handler for the form
   *     submit(event)
   * submit user details on click
   */
  onSubmitHandler = (event) => {
    event.preventDefault();
    const {
      email, username, password,
    } = this.state;
    const { signUp } = this.props;
    signUp(email, username, password);
  }

  /**
   * This is a function which handles onchange events for
   * the input fields for the signup form
   * @param {event} - An event param*
   * @example
   * onchange handler for the form fields
   *     foo(event)
   * change update state on input field value change
   */
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  /**
  * This is a function which returns error messages
  * @param {dictionary} - An dictionary param*
  * @return {string}
  * @example
  *      foo({error:{username: 'error usernam'}})
  * extract string values from the response payloads
  */
  convertToString = (errorMessage) => {
    let returnedString = '';
    if ((typeof errorMessage) !== 'undefined') {
      [returnedString] = errorMessage;
    }
    return returnedString;
  };

  /**
  * This is a function which sets the success message on signup
  * @param {string} - A string param*
  * @return {string}
  * @example
  *      foo({error:{username: 'error username'}})
  * check if signing up was successful
  */
  logSuccessSignup = (signupSuccess) => {
    let signupMessage = '';
    if (signupSuccess.length > 0) {
      signupMessage = SIGNUP_SUCCESS_MESSAGE;
    }
    return signupMessage;
  };

  /**
  * This is a function which checks for password and
  * confirm password similarity
  * @param {(string\|2)} - strings params*
  * @return {string}
  * @example
  *      convert({error:{username: 'error usernam'}})
  * validate confirm password field
  */
  checkForSamePassword = (password, confirmPassword) => {
    let errorMessage = '';
    if (password !== confirmPassword) {
      errorMessage = CONFIRM_PASSWORD_ERROR;
    }
    return errorMessage;
  };

  /**
   * This is a function which renders the SignupUser component
   * @param {none} - An event param*
   * @return {component}
   * @example
   *     render(<Componrnt />)
   */
  render() {
    const {
      email, username, password, confirmPassword,
    } = this.state;
    const {
      signupError, signupSuccess, isSigningUp, closeModal,
    } = this.props;

    return (
      <div>
        <SignupForm
          email={email}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
          emailError={this.convertToString(signupError.email)}
          usernameError={this.convertToString(signupError.username)}
          passwordError={this.convertToString(signupError.password)}
          confirmPasswordError={this.checkForSamePassword(password, confirmPassword)}
          signupMessageState={this.logSuccessSignup(signupSuccess)}
          closeModal={closeModal}
          isSigningUp={isSigningUp}
          backdropId="signupModal"
        />
      </div>
    );
  }
}

/**
* This is a function which maps the props to state
* @param {dictionary} - A dictionary of state param*
* @return {dictionary}
* @example
*      foo({isSigningUp: true})
*/
const mapStateToProps = (state) => {
  const {
    signupSuccess, signupError, isSigningUp,
  } = state.registerReducer;
  return {
    signupSuccess, signupError, isSigningUp,
  };
};

/**
* This is a function shich dispatches signup function to props
* @param {function} - An in-built function param*
* @return {function}
* @example
*      foo(dispatch)
*/
const mapDispatchToProps = dispatch => ({
  signUp: (email, username, password) => {
    dispatch(registerUserActions(email, username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupUser);
