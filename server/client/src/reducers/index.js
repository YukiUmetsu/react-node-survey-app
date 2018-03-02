/**
 * Created by yukiX on 2018/02/28.
 */
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});