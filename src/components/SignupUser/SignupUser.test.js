// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import { SignupUser } from 'components/SignupUser';
/**
* @type {*} n
*/
const props = {
  onSubmitHandler: jest.fn(),
  onChangeHandler: jest.fn(),
  registerUserActions: jest.fn(),
  signUp: jest.fn(),
  isSigningUp: true,
  email: '',
  username: '',
  password: '',
  backdropId: 'signupModal',
  closeModal: jest.fn(),
};

/**
 * This is a function which tests SignupUser component
 */
describe('SignupUser Component', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<SignupUser {...props} />);
    instance = wrapper.instance();
  });

  it('matches the snapshot', () => {
    const component = shallow(<SignupUser {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should handle signup error', () => {
    const event = {
      target: {
        type: 'submit',
        name: 'signup',
      },
    };
    const signupSuccess = instance.onChangeHandler(event);
    event.preventDefault = jest.fn();
    instance.onSubmitHandler(event);
    instance.onChangeHandler(event);
    expect(signupSuccess).toBe(undefined);
    instance.setState({ signupError: { errors: { username: 'username error', email: 'email error', password: 'password error' } } });
    expect(instance.props.isSigningUp).toBe(true);
  });
});
