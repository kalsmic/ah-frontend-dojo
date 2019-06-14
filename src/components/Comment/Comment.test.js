import React from 'react';
import { shallow } from 'enzyme';
import { Comment, mapStateToProps, mapDispatchToProps } from 'components/Comment/';
import commentTestData from 'store/reducers/commentReducer/__mocks__';


describe('Comment Box', () => {
  let wrapper;
  const getCommentsFn = jest.fn();
  const deleteCommentFn = jest.fn();
  const props = {
    getComments: getCommentsFn,
    deleteComment: deleteCommentFn,
    comments: commentTestData,
    articleSlug: 'javascript-code',
    commentsCount: commentTestData.length,
    username: 'zack'
  };

  it('should render without crushing', () => {
    wrapper = shallow(<Comment
      {...props}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const mockedState = {
      loginReducer: {
        user: {
          username: 'arthur'
        }
      },
      commentReducer: {
        comments: commentTestData,
        commentsCount: commentTestData.length,
      }
    };

    const state = mapStateToProps(mockedState);

    expect(state.username).toEqual('arthur');
    expect(state.commentsCount).toBe(2);
  });

  it('should map dispatch to props', () => {
    mapDispatchToProps(getCommentsFn).getComments();
    expect(getCommentsFn).toHaveBeenCalled();

    mapDispatchToProps(deleteCommentFn).deleteComment();
    expect(deleteCommentFn).toHaveBeenCalled();
  });
});
