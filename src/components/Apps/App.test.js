import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import store from 'store/store';
import { LandingPage } from 'pages/Landing';
import { MemoryRouter } from 'react-router';
import App from './App';

describe('routes using memory router', () => {
  it('should show Home component for / router (using memory router)', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find(LandingPage)).toHaveLength(1);
  });
});

// test to check if the App component matches the snapshot
describe('App Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });
});
