// user login reducer
import loginReducer from 'store/reducers/loginReducer';
// user login constants
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from 'store/actions/loginTypes';

describe('loginReducer state', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(
      {
        loggingIn: false,
        error: '',
        user: null,

      },
    );
  });
  it('should handle set the loading to true when login request is sent', () => {
    expect(
      loginReducer(
        {
          loggingIn: false,
          error: '',
        },
        {

          type: LOGIN_REQUEST,
          payload: { loggingIn: true },
        },
      ),
    ).toEqual({
      error: '',
      loggingIn: true,

    });
  });

  it('should update login status to true and islogging in in to false', () => {
    const userData = { email: 'admin@email.com', token: 'x.y.z' };

    expect(
      loginReducer(
        {
          loggingIn: false,
          user: userData.user,
        },
        {
          type: LOGIN_SUCCESS,
          user: userData,
        },
      ),
    ).toEqual({
      loggingIn: false, error: '', user: userData, success: true,
    });
  });

  it('should handle set the loading to false when login failure is sent', () => {
    expect(
      loginReducer(
        {
          loggingIn: false,
        },
        {
          type: LOGIN_FAILURE,
          error: 'Wrong credentials',
        },
      ),
    ).toEqual({
      loggingIn: false,
      error: 'Wrong credentials',
    });
  });

  it('should handle user logout', () => {
    expect(
      loginReducer(
        {
          loggingIn: false,
        },
        {
          type: LOGOUT,

        },
      ),
    ).toEqual({ user: null, loggingIn: false });
  });
});
