// Import axios
import axios from 'axios';

// user constants
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from 'store/actions/loginTypes';

// base url for api
import { baseURL, isAuthenticated } from 'utils';

// action for activating an isLoading image
const loginRequest = isLoading => ({
  type: LOGIN_REQUEST,
  isLoading,
});

// return user on successful login
const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  isLoading: false,
  user,
});

// return error on login failure
const loginFailure = error => ({
  type: LOGIN_FAILURE,
  isLoading: false,
  error,
});

const logout = () => ({
  type: LOGOUT,
});

/**
 * This function makes authentication calls to the login endpoint
 * @param {string} email of the user
 * @param {string} password of the user
 * @returns {object}   user object containing username, email and token on success
 * @returns {string} error when wrong user credentials are provided
 */
const loginUser = (email, password) => (dispatch) => {
  // Set request status to loading
  dispatch(loginRequest(true));

  const config = {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'application/json',
  };

  const requestData = { user: { email, password } };
  return axios.post(`${baseURL}${'/users/login/'}`, requestData, config)
    .then((user) => {
      const userData = user.data.user;
      // store authenticated user details
      sessionStorage.setItem('ahToken', userData.token);
      dispatch(loginSuccess(isAuthenticated()));
    }).catch((error) => {
      dispatch(loginFailure(error.response.data.errors.error[0]));
    });
};

export const logoutUser = () => (dispatch) => {
  // Clear user credentials from session
  sessionStorage.removeItem('ahToken');
  return dispatch(logout());
};

export default loginUser;
