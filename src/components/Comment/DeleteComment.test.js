// React library
import React from 'react';

// Third-party libraries
import { mount } from 'enzyme';

//  Components
import DeleteComment from 'components/Comment/DeleteComment';
import Button from 'components/Button';


describe('Comment Box', () => {
  const deleteFn = jest.fn();
  const props = {
    commentId: 1,
    created_at: '2019-06-15T06:02:00.086733Z',
    author: 'arthur',
    articleSlug: 'my_article_slug',
    deleteComment: deleteFn,
    authenticatedUsername: 'arthur'
  };
  let wrapper = mount(<DeleteComment {...props} />);


  it('should render without crushing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow deleting a comment to comment owners only', () => {
    // author same as current user
    expect(wrapper.find(Button).props().disabled).toBe(false);
    const event = {
      target: {
        type: 'button',
        name: 'deleteComment',
      },
      preventDefault: jest.fn(),
    };

    wrapper.find(Button).simulate('click', event);
    expect(deleteFn).toBeCalled();


    // anonymous user
    props.authenticatedUsername = '';
    wrapper = mount(<DeleteComment {...props} />);
    expect(wrapper.text()).toBe('');

    // current user different from comment author
    props.authenticatedUsername = 'Bison';
    props.author = 'Zack';
    wrapper = mount(<DeleteComment {...props} />);
    expect(wrapper.text()).toBe('');
  });
});
