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
        username: 'arthur',
        email: 'admin@email.com',
        token: 'ghjkjbhvgcftuyjiu736e7giwsnbxusijs',
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
};

export default data;
