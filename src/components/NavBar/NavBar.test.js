// react libraries
import React from 'react';
import { shallow } from 'enzyme';

// components
import { shouldContainClass, shouldContainText } from 'utils';
import data from 'store/actions/__mocks__';
import { Navbar, mapStateToProps, mapDispatchToProps } from './index';

// test data

describe('NavBar component', () => {
  const logoutFn = jest.fn();

  const props = {
    signupModal: false,
    loginModal: false,
    user: {
      username: '',
      email: '',
      token: '',
    },
    logout: logoutFn,
  };

  const navBar = shallow(<Navbar {...props} />);

  const wrapper = <Navbar {...props} />;


  it('should render without crushing', () => {
    expect(navBar).toMatchSnapshot();
  });

  it('Should contain a navbar class', () => {
    shouldContainClass(wrapper, '.navbar');
  });

  it('Should conatain a branding class', () => {
    shouldContainClass(wrapper, '.navbar__branding');
  });

  it('Should contain a branding name class', () => {
    shouldContainText(wrapper, '.navbar__branding__name', 'Authors\' Haven');
  });

  it('Should contain a moto class', () => {
    shouldContainText(wrapper, '.navbar__branding__moto', 'We provide blogging bliss and areading experience second to none');
  });

  it('Should contain a navigation class', () => {
    shouldContainClass(wrapper, '.navbar__navigation');
  });

  it('Should contain an auth class', () => {
    shouldContainClass(wrapper, '.navbar__navigation__auth');
  });

  it('Should contain an articles class', () => {
    shouldContainClass(wrapper, '.navbar__navigation__articles');
  });

  it('Should contain an articles ul class', () => {
    shouldContainClass(wrapper, '.navbar__navigation__articles__ul');
  });

  it('should call the logout function', () => {
    navBar.instance().logout({
      preventDefault: () => {
      },
    });

    expect(logoutFn).toBeCalled();
  });

  it('should map state to props', () => {
    const mockedState = {
      loginReducer: {
        user: {
          username: 'dojo',
          email: 'email@email.com',
          token: data.login.success.user.token,
        },
      },
      facebookReducer: {
        user: {
          username: 'dojo',
          email: 'email@social.com',
          token: data.login.success.user.token,
        },
      },
      googleReducer: {
        user: {
          username: 'dojo',
          email: 'email@social.com',
          token: data.login.success.user.token,
        },
      }
    };

    const state = mapStateToProps(mockedState);

    expect(state.email).toBe(mockedState.loginReducer.email);
    expect(state.username).toBe(mockedState.loginReducer.username);
    expect(state.token).toBe(mockedState.loginReducer.token);
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch).logout();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should toggle the modal open status', () => {
    // Open login modal
    navBar.find('#loginModal').simulate('click');

    expect(navBar.state().loginModal).toBe(true);

    expect(navBar.state().signupModal).toBe(false);

    // Open sign up modal
    navBar.find('#signupModal').simulate('click');

    expect(navBar.state().signupModal).toBe(true);
  });

  it('should show user info and logout button when user is logged in', () => {
    // Open login modal
    navBar.setProps({
      user: {
        username: 'arthur',
        token: 'x.y.z',
        email: 'admin@admin.com'
      }
    });

    const userInfo = navBar.find('#userInfo').find('ul').children();

    expect(userInfo.at(0).text()).toBe('arthur');
    expect(userInfo.at(1).text()).toBe(' Logout');
  });

  it('should show user info and logout button when user is logged in', () => {
    // Open login modal
    navBar.setProps({
      user: {
        username: 'arthur',
        token: 'x.y.z',
        email: 'admin@admin.com'
      }
    });

    const userInfo = navBar.find('#userInfo').find('ul').children();

    expect(userInfo.at(0).text()).toBe('arthur');
    expect(userInfo.at(1).text()).toBe(' Logout');
  });
});
