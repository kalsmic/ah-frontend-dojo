import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from 'components/Login';

import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import InputBox from 'components/InputBox';


describe('login component', () => {
  const props = {
    login: jest.fn(),
    closeModal: jest.fn(),
  };

  const initialState = {
    isLoading: false,
    isLoggedIn: false,
    isLoggingIn: false,
    errors: '',
    success: '',
  };
  const mockStore = configureStore([thunk]);
  let wrapper;
  let store;


  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
    wrapper = shallow(<Login store={store} {...props} />);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render without crsshing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle the onchange event', () => {
    const event = {
      target: {
        name: 'password',
        value: 'Pa$$word123',
      },
    };

    wrapper.instance().handleChange(event);
    expect(wrapper.instance().state.password).toBe('Pa$$word123');
  });


  it('should handle the onSubmit event', () => {
    const instance = wrapper.instance();
    wrapper.setState({ email: '', password: '' });
    const event = {
      target: {
        type: 'submit',
        name: 'login',
      },
      preventDefault: jest.fn()
    };

    instance.handleSubmit(event);
    expect(instance.state.isSubmitted).toEqual(true);
    expect(wrapper.find('#emailError').text()).toEqual('email is required');
    expect(wrapper.find('#passwordError').text()).toEqual('Password is required');
    expect(wrapper.instance().state.email).toBe('');


    wrapper.setState({ email: 'admin@email.com', password: 'Pa4$word123' });
    expect(wrapper.find(InputBox).at(0).props().value).toBe('admin@email.com');
    expect(wrapper.find(InputBox).at(1).props().value).toBe('Pa4$word123');

    instance.handleSubmit(event);

    expect(instance.props.login).toBeCalled();
  });


  it('should map state to props', () => {
    const mockedState = {
      loginReducer: {
        isLoggingIn: false,
        error: 'User with this email and password does not exist',
        success: '',
      },

    };

    const state = mapStateToProps((mockedState));
    expect(state.error).toBe('User with this email and password does not exist');
  });


  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch).login();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should update the dom on change of state', () => {
    const instance = wrapper.instance();
    wrapper.setProps({
      error: 'User with this email and password does not exist',
      isLoggingIn: true,

    });
    expect(instance.props.error).toBe('User with this email and password does not exist');
    expect(instance.props.isLoggingIn).toBe(true);

    expect(wrapper.exists('img'));

    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
