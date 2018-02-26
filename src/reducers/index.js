import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  notes: notesReducer,
  user: userReducer,
  loading: loadingReducer
});
