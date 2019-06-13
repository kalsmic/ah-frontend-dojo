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
  const defaultUser = { email: '', token: '', username: '', };
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(
      {
        isLoggingIn: false,
        error: '',
        user: defaultUser,

      },
    );
  });
  it('should handle set the loading to true when login request is sent', () => {
    expect(
      loginReducer(
        {
          isLoggingIn: false,
          error: '',
        },
        {

          type: LOGIN_REQUEST,
          payload: { isLoggingIn: true },
        },
      ),
    ).toEqual({
      error: '',
      isLoggingIn: true,

    });
  });

  it('should update login status to true and islogging in in to false', () => {
    const userData = { email: 'admin@email.com', token: 'x.y.z' };

    expect(
      loginReducer(
        {
          isLoggingIn: false,
          user: userData.user,
        },
        {
          type: LOGIN_SUCCESS,
          user: userData,
        },
      ),
    ).toEqual({
      isLoggingIn: false, error: '', user: userData, success: true,
    });
  });

  it('should handle set the loading to false when login failure is sent', () => {
    expect(
      loginReducer(
        {
          isLoggingIn: false,
        },
        {
          type: LOGIN_FAILURE,
          error: 'Wrong credentials',
        },
      ),
    ).toEqual({
      isLoggingIn: false,
      error: 'Wrong credentials',
    });
  });

  it('should handle user logout', () => {
    expect(
      loginReducer(
        {
          isLoggingIn: false,
        },
        {
          type: LOGOUT,

        },
      ),
    ).toEqual({ user: defaultUser, isLoggingIn: false });
  });
});
