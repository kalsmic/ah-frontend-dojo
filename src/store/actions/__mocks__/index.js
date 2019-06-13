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
};

export default data;
