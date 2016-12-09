import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import stories from './stories';

export default combineReducers({ user, users, stories });