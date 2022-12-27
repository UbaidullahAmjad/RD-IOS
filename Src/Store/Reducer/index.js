import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import franchiseeReducer from './franchiseeReducer';
import sharedREducer from './sharedReducer';
import cartReducer from './cartReducer';
import rectifyReducer from './rectifyReducer';

export default combineReducers({
    user: UserReducer,
    fransh: franchiseeReducer,
    shared: sharedREducer,
    cart: cartReducer,
    rectify: rectifyReducer

});
