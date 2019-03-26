// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from "./types";
import { sortTasksByGroup } from '../../instruments/helpers';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(sortTasksByGroup(action.payload));

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter((task) => {
                return task.get("id") !== action.payload;
            });

        case types.EDIT_MESSAGE_TASK:
            
            return state.update(action.payload.get('index'), (task) => {
                return task.set('message', action.payload.get('message'));
            });

        default:
            return state;
    }
};
