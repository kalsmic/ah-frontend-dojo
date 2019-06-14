//  Import React library
import React, { Component } from 'react';

// Third-party libraries
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { readComments, removeComment } from 'store/actions/commentActions';
import CommentForm from 'components/Comment/CommentForm';
import CommentBox from 'components/Comment/CommentBox';

// Stylesheets
import './Comment.scss';

export class Comment extends Component {
  // Proptype validation
  static propTypes = {
    username: PropTypes.string.isRequired,
    articleSlug: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    getComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.shape({
          firstname: PropTypes.string.isRequired,
          lastname: PropTypes.string.isRequired,
          bio: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
        highlighted_text: PropTypes.string,
        start_index: PropTypes.string,
        end_index: PropTypes.string,
      }).isRequired
    ).isRequired,

  };

  componentDidMount() {
    const { articleSlug, getComments } = this.props;
    getComments(articleSlug);
  }


  render() {
    const {
      comments, commentsCount, articleSlug, deleteComment, username
    } = this.props;

    const commentList = comments.reverse().map(comment => (
      <CommentBox
        key={comment.id}
        {...comment}
        commentId={comment.id}
        deleteComment={deleteComment}
        articleSlug={articleSlug}
        authenticatedUsername={username}
      />
    ));

    return (
      <div className="commentForm">
        <span className="comment_section_stats">
          {commentsCount}
          {' '}
          comments
        </span>
        <CommentForm articleSlug={articleSlug} />
        <div className="comments_list">
          {' '}
          {commentList}
        </div>
      </div>
    );
  }
}

// map state to props
export const mapStateToProps = (state) => {
  const {
    commentReducer: { comments, commentsCount },
    loginReducer: { user: { username } }
  } = state;
  return { comments, commentsCount, username };
};

// map dispatch to props
export const mapDispatchToProps = dispatch => ({
  getComments(articleSlug) {
    dispatch(readComments(articleSlug));
  },
  deleteComment(articleSlug, commentId) {
    dispatch(removeComment(articleSlug, commentId));
  }
});

// export default CommentList;
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
