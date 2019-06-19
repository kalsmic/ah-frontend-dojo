// action-types
import {
  GET_ARTICLES,
  GET_ARTICLES_START,
  GET_ARTICLES_ERROR,
} from 'store/actions/articleTypes';

const initialState = {
  isFetching: false,
  articles: [],
  errors: [],
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_START:
      return Object.assign({}, state, { isFetching: true });

    case GET_ARTICLES:
      return Object.assign({}, state,
        {
          isFetching: false,
          articles: action.articles,
          count: action.count,
          next: action.next,
          previous: action.previous,
        });

    case GET_ARTICLES_ERROR:
      return Object.assign({}, state,
        {
          isFetching: false,
          errors: action.errors,
        });

    default:
      return state;
  }
};

export default articles;
