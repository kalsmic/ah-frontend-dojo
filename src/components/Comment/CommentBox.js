// react
import React from 'react';

//  Third-party library
import PropTypes from 'prop-types';

// Components
import DeleteComment from 'components/Comment/DeleteComment';


const date = timestamp => (new Date(timestamp).toString().slice(0, 25));
const CommentBox = (
  {
    commentId, author: { username, image },
    created_at, body, articleSlug, deleteComment, authenticatedUsername
  }
) => (
  <div className="comment">
    <img className="comment__img" alt="author" src={image} />
    <div className="comment__header">
      <p className="comment__header__author">{username}</p>
      <span className="comment__header__timestamp">{date(created_at)}</span>
    </div>
    <div className="comment__body">{body}</div>
    <div className="comment_footer">
      {' '}
      {}
    </div>
    <div className="comment__footer">
      <DeleteComment
        author={username}
        commentId={commentId}
        articleSlug={articleSlug}
        deleteComment={deleteComment}
        authenticatedUsername={authenticatedUsername}
      />
    </div>

  </div>
);

// PropType validation
CommentBox.propTypes = {
  authenticatedUsername: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  articleSlug: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentBox;
