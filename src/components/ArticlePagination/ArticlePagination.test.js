import React from 'react';

import { mount } from 'enzyme';

import ArticlePagination from 'components/ArticlePagination';
import Button from 'components/Button';

describe('ArticlePagination', () => {
  const props = {
    previous: null,
    next: 'next',
    paginate: jest.fn(),
    count: 20,
  };
  let wrapper = mount(<ArticlePagination {...props} />);

  it('should render without crushing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const previousButton = wrapper.find(Button).at(0);
  const nextButton = wrapper.find(Button).at(1);

  it('should disable buttons if null', () => {
    expect(previousButton.props().disabled).toBe(true);
    expect(nextButton.props().disabled).toBe(false);
  });


  it('should call the paginate function on button click', () => {
    const event = {
      target: {
        type: 'button',
        name: '',
      },
      preventDefault: jest.fn(),
    };

    nextButton.simulate('click', event);
    expect(props.paginate).toBeCalled();
    previousButton.simulate('click', event);


    props.previous = 'previous';
    wrapper = mount(<ArticlePagination {...props} />);
    wrapper.find(Button).at(0).simulate('click', event);
    expect(props.paginate).toBeCalled();
  });
});
