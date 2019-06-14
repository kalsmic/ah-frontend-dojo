// helper functions
import {
  ADD_COMMENT_SUCCESS,
  COMMENT_ERROR,
  COMMENT_REQUEST,
  DELETE_COMMENT,
  GET_COMMENTS
} from 'store/actions/commentTypes';

import { createComment, removeComment, readComments } from 'store/actions/commentActions';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import data from 'store/actions/__mocks__/index';
import commentTestData from 'store/reducers/commentReducer/__mocks__';

// actions and action types

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
describe('comment actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create a comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data.addComment.success,
      });
    });

    const expectedActions = [
      {
        type: COMMENT_REQUEST,
      },
      {
        type: ADD_COMMENT_SUCCESS,
        comment: data.addComment.success.comment,
      },
    ];

    return store.dispatch(createComment('article_slug', 'bdy'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an error on creating a comment without a body', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data.addComment.failure,
      });
    });

    const expectedActions = [
      {
        type: COMMENT_REQUEST,
      },
      {
        type: COMMENT_ERROR,
        error: data.addComment.failure.errors.body[0],
      },
    ];

    return store.dispatch(createComment('article_slug'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should get a list of comments for as specific article', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          commentTestData,
          commentsCount: commentTestData.length
        }
      });
    });

    const expectedActions = [
      {
        type: GET_COMMENTS,
        comments: commentTestData.comments,
        commentsCount: commentTestData.length,
      },
    ];

    return store.dispatch(readComments('article_slug', 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return a not found error for invalid article slug', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data.getComments.failure,
      });
    });

    const expectedActions = [
      {
        type: COMMENT_ERROR,
        error: data.getComments.failure.detail,
      },
    ];

    return store.dispatch(readComments('article_slug', 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should delete a comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data.deleteComment.success,
      });
    });

    const expectedActions = [
      {
        type: DELETE_COMMENT,
        message: data.deleteComment.success,
      },
    ];

    return store.dispatch(removeComment('article_slug', 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should return not found on deleting a comment which does not exist', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data.deleteComment.failure,
      });
    });

    const expectedActions = [

      {
        type: COMMENT_ERROR,
        error: data.deleteComment.failure.detail,
      },
    ];

    return store.dispatch(removeComment('article_slug', 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
