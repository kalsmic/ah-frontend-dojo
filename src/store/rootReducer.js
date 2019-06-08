// third party libraries
import { combineReducers } from 'redux';
import registerReducer from 'store/reducers/registerReducer';
import loginReducer from 'store/reducers/loginReducer';
import articles from './reducers/articles';


const rootReducers = combineReducers({
  registerReducer,
  loginReducer,
  articles,
});

export default rootReducers;
