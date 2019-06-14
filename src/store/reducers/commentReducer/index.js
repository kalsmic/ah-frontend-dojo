// comment constants
import {
  COMMENT_REQUEST, ADD_COMMENT_SUCCESS, GET_COMMENTS, DELETE_COMMENT, COMMENT_ERROR
} from 'store/actions/commentTypes';

const commentReducer = (state = {
  comments: [],
  commentsCount: 0,
}, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.comment,
        success: true,
        errors: '',
        isLoading: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
        commentsCount: action.commentsCount,
        isLoading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        message: action.message,
        isLoading: false,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };


    default:
      return state;
  }
};

export default commentReducer;
