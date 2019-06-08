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
import { closeOpenModalFunction } from 'constants/staticsMethods';

export class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      email: '',
      password: '',
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { email, password } = this.state;
    const { login } = this.props;

    if (email && password) {
      login(email, password);
    }
  }


  render() {
    const { loggingIn, error, success } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <ModalBox title="LOGIN" show backdropId="loginModal">
        {success ? closeOpenModalFunction('loginModal') : ''}

        <div className="login">


          <form name="form" onSubmit={this.handleSubmit}>
            <div className={`login__input-group ${submitted && !email ? ' has-error' : ''}`}>
              <InputBox
                inputType="email"
                inputClass="login__input-control"
                name="email"
                value={email}
                handleChange={this.handleChange}
                placeholder="Email"
              >
                {submitted && !email
                && <div id="emailError" className="login__error">email is required</div>
                }
              </InputBox>

            </div>
            <div className={`login_input-group${submitted && !password ? ' has-error' : ''}`}>


              <InputBox
                inputType="password"
                inputClass="login__input-control"
                name="password"
                value={password}
                handleChange={this.handleChange}
                placeholder="Password"
              >
                {submitted && !password
                && <div id="passwordError" className="login__error">Password is required</div>
                }
              </InputBox>


            </div>
            {error && <div className="login__error">{error}</div>}

            <div className="input-group">
              <Button btnName="Login" btnClass="login__button" btnEvent={this.handleSubmit} />
              {loggingIn
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
  const { loggingIn, success, error } = state.loginReducer;

  return {
    loggingIn,
    success,
    error,
  };
};

// Default props
Login.defaultProps = {
  loggingIn: false,
  error: '',
  success: false,
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
};

export const mapDispatchToProps = dispatch => ({
  login(email, password) {
    dispatch(loginUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
