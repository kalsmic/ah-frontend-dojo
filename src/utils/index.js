import { shallow } from 'enzyme';
import jwt_decode from 'jwt-decode';

export const baseURL = 'https://ah-backend-dojo-dev.herokuapp.com/api';

export const formatDate = (rawDate) => {
  const longDateTime = new Date(rawDate);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const month = months[longDateTime.getMonth()];
  const day = days[longDateTime.getDay()];
  const year = longDateTime.getFullYear();
  let date = longDateTime.getDate();

  if (date < 10) {
    date = `0${date}`;
  }

  return `${day} ${date} ${month} ${year}`;
};

export const mockArticle = (
  title = 'This is the first article',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna sit amet purus gravida quis blandit turpis. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.',
) => (
  {
    id: 1,
    slug: 'this-is-the-first-article',
    title,
    body: 'An article first',
    description,
    author: 'kalsmic',
    publish_status: false,
    createdAt: '2019-05-17T12:56:21.406849Z',
    updatedAt: '2019-05-07T12:56:21.406908Z',
    delete_status: false,
    tagList: [
      'one',
      'two',
    ],
    time_to_read: 2,
    read_stats: {
      views: 0,
      reads: 0,
    },
    likeCount: [
      {
        likes: 0,
        dislikes: 0,
      },
    ],
  });

const renderComponent = component => shallow(component);

export const shouldContainClass = (component, className) => {
  expect(renderComponent(component).find(className).length).toBe(1);
};

export const shouldContainText = (component, className, text) => {
  expect(renderComponent(component).find(className).text()).toBe(text);
};
/**
*Checks if user session is set
* @param none
* @return {object} {username,email,token} if sessionStorage is set
 * else return user object with empty values
*/
export const isAuthenticated = () => {
  try {
    const token = sessionStorage.getItem('ahToken');

    const UserInfo = jwt_decode(token);

    return {
      username: UserInfo.username,
      email: UserInfo.email,
      token,
    };
  } catch
  (error) {
    // invalid token format
    return {
      username: '',
      email: '',
      token: ''
    };
  }
};
