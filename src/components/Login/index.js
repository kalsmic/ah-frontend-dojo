// React
import React, { Component } from 'react';

// third-party libraries
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// login action
import loginUser from 'store/actions/loginActions';

// Import components
import InputBox from 'components/InputBox';
import Button from 'components/Button';

// Login form css
import 'components/Login/Login.scss';

// Modal Component
import ModalBox from 'components/ModalBox';

export class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      email: '',
      password: '',
      isSubmitted: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit= (e) => {
    e.preventDefault();

    this.setState({ isSubmitted: true });

    const { email, password } = this.state;
    const { login } = this.props;

    if (email && password) {
      login(email, password);
    }
  }


  render() {
    const {
      isLoggingIn, error, success, closeModal
    } = this.props;
    const { email, password, isSubmitted } = this.state;
    return (
      <ModalBox title="LOGIN" show backdropId="loginModal" closeModal={closeModal}>
        {success ? closeModal() : ''}

        <div className="login">

          <form name="form" onSubmit={this.handleSubmit}>
            <div className={`login__input-group ${isSubmitted && !email ? ' has-error' : ''}`}>
              <InputBox
                inputType="email"
                inputClass="login__input-control"
                name="email"
                value={email}
                handleChange={this.handleChange}
                placeholder="Email"
              >
                {isSubmitted && !email
                && <div id="emailError" className="login__error">email is required</div>
                }
              </InputBox>

            </div>
            <div className={`login_input-group${isSubmitted && !password ? ' has-error' : ''}`}>


              <InputBox
                inputType="password"
                inputClass="login__input-control"
                name="password"
                value={password}
                handleChange={this.handleChange}
                placeholder="Password"
              >
                {isSubmitted && !password
                && <div id="passwordError" className="login__error">Password is required</div>
                }
              </InputBox>


            </div>
            {error && <div className="login__error">{error}</div>}

            <div className="input-group">
              <Button btnName="Login" btnClass="login__button" btnEvent={this.handleSubmit} />
              {isLoggingIn
              && (
                <img
                  alt="loading"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )
              }
              <i className="login__forgot__pwd">
                {' '}
                <Link to="/log" id="forgot">Forgot Password </Link>
                {' '}
                or signin with
              </i>
            </div>

            <div className="login__social">
              <a className="button--social-login button--facebook" href="fb">
                <i className="icon fa fa-facebook" />
              </a>
              <a className="button--social-login button--linkedin" href="#google">
                <i className="icon fa fa-google" />
              </a>

            </div>


          </form>
        </div>
      </ModalBox>
    );
  }
}

export const mapStateToProps = (state) => {
  const { isLoggingIn, success, error } = state.loginReducer;

  return {
    loggingIn: isLoggingIn,
    success,
    error,
  };
};

// Default props
Login.defaultProps = {
  isLoggingIn: false,
  error: '',
  success: false,
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  login(email, password) {
    dispatch(loginUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
