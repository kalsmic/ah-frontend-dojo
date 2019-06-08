// user login constant
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from 'store/actions/loginTypes';

import { isAuthenticated } from 'utils';

const initialLoginState = {
  isLoggingIn: false,
  error: '',
  user: isAuthenticated(),
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        error: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.user,
        error: '',
        success: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error,

      };
    case LOGOUT:
      return {
        ...state,
        user: null,

      };

    default:
      return state;
  }
};

export default loginReducer;
