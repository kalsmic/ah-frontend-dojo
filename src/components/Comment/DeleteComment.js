// React library
import React, { Fragment } from 'react';

// Third-party libraries
import PropTypes from 'prop-types';

// components
import Button from 'components/Button';

const DeleteComment = ({
  commentId, author, articleSlug, deleteComment, authenticatedUsername
}) => (
  <Fragment>
    {authenticatedUsername === author && (
    <Button
      btnClass="fa fa-trash btn delete"
      btnEvent={(event) => {
        event.preventDefault();
        deleteComment(articleSlug, commentId);
      }}
      btnName=""
      disabled={authenticatedUsername !== author}
    />
    )}
  </Fragment>
);

// PropType validation
DeleteComment.propTypes = {
  authenticatedUsername: PropTypes.string.isRequired,
  articleSlug: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default DeleteComment;
