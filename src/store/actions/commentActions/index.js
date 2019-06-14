// Import axios
import axios from 'axios';


// Comment constants
import {
  ADD_COMMENT_SUCCESS, COMMENT_ERROR, COMMENT_REQUEST, DELETE_COMMENT, GET_COMMENTS
} from 'store/actions/commentTypes';

// base url for api
import { baseURL, isAuthenticated } from 'utils';


// comment request
const commentRequest = () => ({
  type: COMMENT_REQUEST,
});

// add comment
const addCommentRequest = comment => ({
  type: ADD_COMMENT_SUCCESS,
  comment,
});

// add comment
const getCommentsRequest = (comments, commentsCount) => ({
  type: GET_COMMENTS,
  comments,
  commentsCount,
});

// delete comment
const deleteCommentRequest = message => ({
  type: DELETE_COMMENT,
  message,
});

// comment error
export const displayCommentErrorRequest = (errorMessage) => {
  let error;

  if (Object.getOwnPropertyDescriptor(errorMessage, 'detail')) {
    error = errorMessage.detail;
  } else if (Object.getOwnPropertyDescriptor(errorMessage, 'errors')) {
    const { errors: { body } } = errorMessage;
    [error] = body;
  }
  return {
    type: COMMENT_ERROR,
    error,
  };
};

/**
 * This function gets a list of comments for a specific article
 * @param {string} article_slug
 * @returns {object}   returns a list of comments or an empty list if none
 */
export const readComments = articleSlug => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'application/json',
  };

  return axios.get(`${baseURL}/articles/${articleSlug}/comments/`, config)

    .then((comment) => {
      const commentData = comment.data;

      dispatch(getCommentsRequest(commentData.comments, commentData.commentsCount));
    }).catch(error => (dispatch(displayCommentErrorRequest(error.response.data))));
};
/**
 * This function deletes  a comment for a specific article
 * @param {string} article_slug
 * @param {number} commentId
 * @returns {object}   returns a list of comments or an empty list if none
 */
export const removeComment = (articleSlug, commentId) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '.concat(isAuthenticated().token)
    },
    responseType: 'application/json',
  };

  return axios.delete(`${baseURL}/articles/${articleSlug}/comments/${commentId}/`, config)

    .then((success) => {
      dispatch(deleteCommentRequest(success.data));
      dispatch(readComments(articleSlug));
    }).catch(error => (dispatch(displayCommentErrorRequest(error.response.data))));
};


/**
 * This function adds a comment on an article
 * @param {string} article_slug
 * @param {string} comment body
 * @returns {object}   created comment
 * @returns {string} errors if comment is invalid
 */

export const createComment = (articleSlug, commentBody) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '.concat(isAuthenticated().token)
    },
    responseType: 'application/json',
  };
  dispatch(commentRequest());

  return axios.post(`${baseURL}/articles/${articleSlug}/comments/`, { comment: { body: commentBody } }, config)

    .then((comment) => {
      const commentData = comment.data.comment;

      dispatch(addCommentRequest(commentData));
      dispatch(readComments(articleSlug));
    }).catch(error => (dispatch(displayCommentErrorRequest(error.response.data))));
};


export default createComment;
