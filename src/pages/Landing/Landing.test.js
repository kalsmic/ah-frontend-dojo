// react imports
import React from 'react';

// third party libraries
import { shallow } from 'enzyme';

// component imports
import { mockArticle, shouldContainClass, shouldContainText } from 'utils';
import { LandingPage } from '.';
import ArticleColumn from './ArticleColumn';

describe('Landing Page', () => {
  it('should render', () => {
    expect(shallow(<LandingPage />).exists()).toBe(true);
  });

  it('Should render a bannerImage class', () => {
    shouldContainClass(<LandingPage />, '.banner-image');
  });

  it('Should render a welcomePitch class', () => {
    shouldContainClass(<LandingPage />, '.welcome-pitch');
  });

  it('Should contain an article-grid class', () => {
    shouldContainClass(<LandingPage />, '.article-grid');
  });
});

describe('Article Column', () => {
  it('Should contain an article-grid__col class', () => {
    shouldContainClass(<ArticleColumn columnTitle="Most Recent" />, '.article-grid__col');
  });

  it('Should contain an article-grid__col__header__title class', () => {
    shouldContainText(<ArticleColumn columnTitle="Most Recent" />, '.article-grid__col__header__title', 'Most Recent');
  });

  it('Should receive an article', () => {
    const component = shallow(<ArticleColumn columnTitle="Most Recent" articles={[mockArticle()]} />);
    expect(component.exists()).toBe(true);
  });

  it('should call the get articles  function', () => {
    const getArticlesFn = jest.fn();
    const props = {
      next: 'nexturl',
      previous: 'previousurl',
      count: 10,
      articles: [],
      getArticles: getArticlesFn,

    };
    const wrapper = shallow(<LandingPage {...props} />);
    wrapper.instance().paginate();
    expect(getArticlesFn).toBeCalled();
  });
});
