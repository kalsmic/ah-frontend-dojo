// react libraries
import React from 'react';
import { shallow } from 'enzyme';

// components
import { shouldContainClass, shouldContainText } from 'utils';
import { Navbar } from './index';

describe('NavBar component', () => {
  const props = {
    opensignupModal: false,
    openloginModal: false,
    user: {
      username: '',
    },
    logout: jest.fn(),
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
});
