// Core
import { combineReducers } from 'redux';
// import { routerReducer as router } from 'react-router-redux';

// Reducers
import { tasksReducer as tasks } from '../bus/tasks/reducer';

export const rootReducer = combineReducers({
    tasks,

});
