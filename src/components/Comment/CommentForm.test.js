// React library
import React from 'react';

// Third-party libraries
import { shallow } from 'enzyme';

// Components
import Button from 'components/Button';
import { CommentForm, mapStateToProps, mapDispatchToProps } from './CommentForm';


describe('Comment component', () => {
  const props = {
    articleSlug: '',
    createNewComment: jest.fn(),
    username: 'dojo',
  };

  let wrapper;


  beforeEach(() => {
    wrapper = shallow(<CommentForm {...props} />);
  });


  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should limit commenting on articles to authenticated users', () => {
    expect(wrapper.find(Button).props().disabled).toBe(false);
    wrapper.setProps({ username: '' });
    expect(wrapper.find('i').text()).toBe(' login to comment');
    expect(wrapper.find(Button).props().disabled).toBe(true);
  });

  it('should handle the comment body input change event', () => {
    const event = {
      target: {
        name: 'commentBody',
        value: 'My first comment',
      },
    };

    wrapper.instance().handleChange(event);
    expect(wrapper.instance().state.commentBody).toBe(event.target.value);
  });

  it('should handle the onSubmit event', () => {
    const instance = wrapper.instance();
    wrapper.setState({ commentBody: '' });
    wrapper.setProps({ articleSlug: 'my_article_slug' });
    const event = {
      target: {
        type: 'submit',
        name: 'addComment',
      },
      preventDefault: jest.fn(),
    };

    instance.handleCommentSubmit(event);

    expect(instance.props.createNewComment.mock.calls.length).toBe(0);

    wrapper.setState({ commentBody: 'My first comment' });
    instance.handleCommentSubmit(event);

    expect(instance.props.createNewComment.mock.calls.length).toBe(1);
    expect(instance.props.createNewComment).toBeCalled();
  });

  it('should show an error on submitting a comment with  on missing comment body', () => {
    wrapper.setState({ error: 'Comment body is required' });
    expect(wrapper.find('.error-msg').text()).toBe('Comment body is required');
  });

  it('should show a success message on successfully commenting on an article', () => {
    wrapper.setProps({ success: true });
    expect(wrapper.find('.success-msg').text()).toBe('Comment added successfully');
  });


  it('should map state to props', () => {
    const mockedState = {
      loginReducer: {
        user: {
          username: 'arthur'
        }
      },
      commentReducer: {
        success: true,
      }
    };

    const state = mapStateToProps(mockedState);

    expect(state.username).toEqual('arthur');
    expect(state.success).toEqual(true);
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch).createNewComment();
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
