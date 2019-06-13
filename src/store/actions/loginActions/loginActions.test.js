// helper functions
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from 'store/actions/loginTypes';

import loginUser, { logoutUser } from 'store/actions/loginActions';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import data from 'store/actions/__mocks__/index';

// actions and action types

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
describe('actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should return user info on successful login', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data.login.success,
      });
    });

    const expectedActions = [
      {
        type: LOGIN_REQUEST,
        isLoading: true,
      },
      {
        user: data.login.success.user,
        type: LOGIN_SUCCESS,
        isLoading: false,

      },
    ];

    return store.dispatch(loginUser('"ahbackenddojo@gmail.com"', 'Pa$$word123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return error message on invalid login', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data.login.failure,
      });
    });

    const expectedActions = [
      {
        type: LOGIN_REQUEST,
        isLoading: true,
      },
      {
        error: 'A user with this email and password was not found.',
        type: LOGIN_FAILURE,
        isLoading: false,

      },
    ];

    return store.dispatch(loginUser('admn@email.com', 'Pa$$word123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should empty the loginReducer state on logout', () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: LOGOUT,
      },
    ];

    store.dispatch(logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
