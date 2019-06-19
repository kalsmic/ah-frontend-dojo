import axios from 'axios';
import { baseURL } from 'utils';
import { GET_ARTICLES, GET_ARTICLES_START, GET_ARTICLES_ERROR } from 'store/actions/articleTypes';

// action creators

/**
 * Action creator to indicate article fetching start.
 * @return {action} - Action to indicate fetching start
 */
export const getArticlesStart = () => ({ type: GET_ARTICLES_START });

/**
 * Action creator to indicate article fetching start.
 * @param {articles}
 * @return {action} - Action to add articles to the store
 */
export const getArticles = articles => ({
  articles: articles.results.articles,
  count: articles.count,
  next: articles.next,
  previous: articles.previous,
  type: GET_ARTICLES,
});

/**
 * Action creator to indicate article fetching start.
 * @param {error}
 * @return {action} - Action to addthe error to the store
 */
export const getArticalsError = error => ({ error, type: GET_ARTICLES_ERROR });

// thunks

/**
 * Thunk to fetch articles.
 * @return {action} - Action to indicate fetching start
 */
export const getAllArticles = apiUrl => (dispatch) => {
  let url = `${baseURL}${'/articles/'}`;

  if (apiUrl) {
    url = apiUrl;
  }

  dispatch(getArticlesStart());
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(({ data }) => dispatch(getArticles(data)))
    .catch(error => dispatch(getArticalsError(error)));
};

// export collection object
const articleActions = {
  getArticles,
  getAllArticles,
};

export default articleActions;
