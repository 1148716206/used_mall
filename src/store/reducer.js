import { combineReducers } from 'redux'
import { reducer as registerReducer} from '../pages/register/store'
import { reducer as loginReducer } from '../pages/login/store';

//组合所有的reducer
export default combineReducers({
  register: registerReducer,
  login: loginReducer
})
