// Core
import { combineReducers } from 'redux';

// Reducers
import { tasksReducer as tasks } from '../bus/tasks/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
    tasks,
    ui,
});
