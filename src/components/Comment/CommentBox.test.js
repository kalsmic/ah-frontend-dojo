import React from 'react';
import { shallow } from 'enzyme';
import CommentBox from 'components/Comment/CommentBox';


describe('Comment Box', () => {
  let wrapper;
  const props = {
    author: { username: 'arthur' },
    commentId: 1,
    created_at: '2019-06-15T06:02:00.086733Z',
    body: 'my first comment',
    articleSlug: 'my_article_slug',
    deleteComment: jest.fn(),
    authenticatedUsername: 'arthur',
  };

  it('should render without crushing', () => {
    wrapper = shallow(<CommentBox
      {...props}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
