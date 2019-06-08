// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import ModalBox from 'components/ModalBox';

/**
* @type {*} n
*/
const props = {
  title: 'signup',
  show: false,
  children: <div />,
  backdropId: 'signupModal',
  closeModal: jest.fn(),

};

/**
 * This is a function.
 * test ModalBox component
 */
describe('ModalBox Component', () => {
  const component = shallow(
    <ModalBox title="hellwo" {...props}>
      <div><h1>Test</h1></div>
    </ModalBox>,
  );
  it('matches the snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('shows the modal when show is true', () => {
    component.setProps({ show: true });
    expect(component.find('.backdrop').exists()).toBe(true);
  });
});
