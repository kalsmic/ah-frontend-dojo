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
    const user = {
      username: 'dojo',
      email: 'ahbackenddojo@gmail.com',
      token: 'x.y.z',
    };
    sessionStorage.setItem('ahUser', JSON.stringify(user));

    expect(isAuthenticated()).toEqual(user);
  });

  it('should return an empty object if no user info in session storage', () => {
    sessionStorage.removeItem('ahUser');

    expect(isAuthenticated()).toEqual(null);
  });
});
