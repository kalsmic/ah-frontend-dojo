import commentReducer from 'store/reducers/commentReducer';
// user login constants
import {
  ADD_COMMENT_SUCCESS, COMMENT_ERROR, COMMENT_REQUEST, DELETE_COMMENT, GET_COMMENTS
} from 'store/actions/commentTypes';
import commentTestData from 'store/reducers/commentReducer/__mocks__';

describe('loginReducer state', () => {
  it('should return the initial state', () => {
    expect(commentReducer(undefined, {})).toEqual(
      { comments: [], commentsCount: 0 }

    );
  });
  it('should handle loading status for comment', () => {
    expect(
      commentReducer(
        {},
        {

          type: COMMENT_REQUEST,
          isLoading: true,
        },
      ),
    ).toEqual({
      isLoading: true,


    });
  });

  it('should handle Add new comment', () => {
    expect(
      commentReducer(
        {},
        {

          type: ADD_COMMENT_SUCCESS,
          comment: {

            articleSlug: '',
            body: 'My first comment',
          },
        },
      ),
    ).toEqual({
      comment: {
        articleSlug: '',
        body: 'My first comment',
      },
      success: true,
      errors: '',
      isLoading: false,

    });
  });

  it('should handle errors on Adding new comment', () => {
    expect(
      commentReducer(
        {},
        {

          type: COMMENT_ERROR,
          error: 'Not found',
        },
      ),
    ).toEqual({
      error: 'Not found',
      isLoading: false,

    });
  });

  it('should handle get all comments', () => {
    expect(
      commentReducer(
        {},
        {

          type: GET_COMMENTS,
          comments: { commentTestData },
          commentsCount: commentTestData.length,
        },
      ),
    ).toEqual({
      comments: { commentTestData },
      commentsCount: commentTestData.length,
      isLoading: false,

    });
  });
  it('should handle delete a comment', () => {
    expect(
      commentReducer(
        {},
        {

          type: DELETE_COMMENT,
          message: 'Comment deleted successfully',
          isLoading: false
        },
      ),
    ).toEqual({
      message: 'Comment deleted successfully',
      isLoading: false

    });
  });
});
