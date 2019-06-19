// react
import React from 'react';

// Proptypes for validation
import PropTypes from 'prop-types';

// stylesheets
import './ArticlePagination.scss';

// Button component
import Button from 'components/Button';

const ArticlePagination = ({
  previous, next, paginate, count, page
}) => {
  const pages = Math.ceil(count / 10);
  return (

    <div className="article-pagination">
      <Button
        btnName=""
        btnClass="fa fa-backward"
        btnEvent={(e) => {
          e.preventDefault();
          paginate(previous, -1);
        }}
        disabled={!previous}
      />
      <span>
        {page || 1}
        {' '}
        {'/'}
        {' '}
        {pages}
        {' '}
        {'pages '}
      </span>
      <Button
        btnName=""
        btnClass="fa fa-forward"
        btnEvent={(e) => {
          e.preventDefault();
          paginate(next, 1);
        }}
        disabled={!next}
      />
    </div>
  );
};

ArticlePagination.defaultProps = {
  next: null,
  previous: null,
};

ArticlePagination.propTypes = {
  next: PropTypes.string,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  previous: PropTypes.string,
  paginate: PropTypes.func.isRequired,
};


export default ArticlePagination;
