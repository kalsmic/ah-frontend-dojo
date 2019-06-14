const data = {
  register: {
    userData: {
      user: {
        username: 'lamech',
        email: 'lamech@bolon.com',
        password: 'Password#1',
      },
    },
    signupSuccess: {
      token: 'hsjsiewiow984ho3490nownb[9wh9',
    },
    signupError: {
      signupError: {
        errors: {
          username: '',
          email: '',
          password: '',
        },
      },
    },
  },
  login: {
    success: {
      user: {
        username: 'dojo',
        email: 'ahbackenddojo@gmail.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjEsInVzZXJuYW1lIjoiZG9qbyIsImVtYWlsIjoiYWhiYWNrZW5kZG9qb0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.yTCWAyuTKtmMtT8_lNxxaMYXelWKSuasMgCv4DyNbKE',
      },
    },
    failure: {
      errors: {
        error: [
          'A user with this email and password was not found.',
        ],
      },
    },
  },
  soicalAuth: {
    success: {
      user: {
        auth_token: 'eyB0eJDiOiJKW1PiKCJ'
      }
    },
    failure: {
      errors: {
        error: [
          'We have failed to verify your credentials'
        ]
      }
    }
  },
  addComment: {
    success: {
      comment: {
        created_at: '2019-06-14T05:58:57.206787Z',
        updated_at: '2019-06-14T05:58:57.206825Z',
        author: {
          firstname: '',
          lastname: '',
          username: 'adojo',
          bio: '',
          image: '',
          email: 'user@ahhaven.com'
        },
        body: 'my third comment',
        id: 1
      }

    },
    failure: {
      errors: {
        body: [
          'This field may not be blank.',
        ]
      }
    }
  },
  deleteComment: {
    success: {
      message: 'Comment deleted Successfully'
    },
    failure: { detail: 'Not found.' },
  },
  getComments: {
    failure: { detail: 'Not found.' },
  },
};

export default data;
