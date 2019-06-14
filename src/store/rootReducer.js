// third party libraries
import { combineReducers } from 'redux';
import registerReducer from 'store/reducers/registerReducer';
import loginReducer from 'store/reducers/loginReducer';
import commentReducer from 'store/reducers/commentReducer';
import confirmEmailReducer from 'store/reducers/confirmEmailReducer';
import passwordResetReducer from 'store/reducers/passwordResetReducer';
import articles from './reducers/articles';
import facebookReducer from './reducers/socialReducer/Facebook';
import googleReducer from './reducers/socialReducer/Google';
import profile from './reducers/profileReducer';


const rootReducers = combineReducers({
  registerReducer,
  loginReducer,
  articles,
  confirmEmailReducer,
  passwordResetReducer,
  facebookReducer,
  googleReducer,
  profile,
  commentReducer,
});

export default rootReducers;
