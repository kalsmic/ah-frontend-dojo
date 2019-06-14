import { formatDate, isAuthenticated } from './index';

describe('Format date before october', () => {
  it('Should format the date to a readable format', () => {
    const formattedDate = formatDate('2019-05-17T12:56:21.406849Z');
    expect(formattedDate).toBe('Fri 17 May 2019');
  });

  it('Should format the date to a rgit addeadable format', () => {
    const formattedDate = formatDate('2019-05-07T12:56:21.406849Z');
    expect(formattedDate).toBe('Tue 07 May 2019');
  });
});


describe('isAuthenticated user function test', () => {
  it('should return logged in user info if session is set', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjEsInVzZXJuYW1lIjoiZG9qbyIsImVtYWlsIjoiYWhiYWNrZW5kZG9qb0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.yTCWAyuTKtmMtT8_lNxxaMYXelWKSuasMgCv4DyNbKE';
    sessionStorage.setItem('ahToken', token);
    const user = {
      username: 'dojo',
      email: 'ahbackenddojo@gmail.com',
      token,
    };

    expect(isAuthenticated()).toEqual(user);
  });

  it('should return an empty object if no user info in session storage', () => {
    sessionStorage.removeItem('ahToken');

    expect(isAuthenticated()).toEqual({ email: '', token: '', username: '' });
  });
});
