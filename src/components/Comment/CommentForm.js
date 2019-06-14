//  React library
import React, { Component } from 'react';

// third party libraries
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import createComment from 'store/actions/commentActions';

// Components
import Button from 'components/Button';

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
      error: '',
    };
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();


    const { commentBody } = this.state;
    const { createNewComment, articleSlug } = this.props;

    if (articleSlug && commentBody) {
      createNewComment(articleSlug, commentBody);
      this.setState({ commentBody: '' });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  renderCommentError = error => (
    error ? <div className="error-msg text-danger">{ error }</div> : ''
  );

  renderCommentSuccess = success => (success ? <div className="success-msg text-success">Comment added successfully</div> : '');


  render() {
    const { commentBody, error } = this.state;
    const { success, username } = this.props;

    return (
      <div className="comment_form">
        {this.renderCommentError(error)}
        {this.renderCommentSuccess(success)}

        <form onSubmit={this.handleCommentSubmit}>
          <div>
            <textarea
              placeholder="Comment"
              rows="3"
              required
              name="commentBody"
              value={commentBody}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button inputType="submit" btnClass="btn" btnEvent={this.handleCommentSubmit} btnName="Post Comment" disabled={!username} />
            {!username && (
              <i>
                {' login to comment'}
              </i>
            )}
          </div>
        </form>
      </div>
    );
  }
}

// default props
CommentForm.defaultProps = {
  username: '',
  success: false,
};

// Props Validation
CommentForm.propTypes = {
  createNewComment: PropTypes.func.isRequired,
  articleSlug: PropTypes.string.isRequired,
  success: PropTypes.bool,
  username: PropTypes.string,
};

// mapState to props
export const mapStateToProps = (state) => {
  const { commentReducer: { success }, loginReducer: { user: { username } } } = state;
  return { success, username };
};

// map dispatch to props
export const mapDispatchToProps = dispatch => ({
  createNewComment(articleSlug, commentBody) {
    dispatch(createComment(articleSlug, commentBody));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
