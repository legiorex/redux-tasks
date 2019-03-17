// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from "./types";

const initialState = List();

export const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter((task) => {
                return task.get("id") !== action.payload;
            });
        case types.TOGGLE_FAVORITE_TASK:

            const updatedTask = action.payload.set('favorite', true);

            console.log('изначальный', action.payload);
            const indexCurrentTask = state.findIndex((task) => {
                return task === action.payload;
            });

            return state.update(indexCurrentTask, (task) => {
                return task.set('favorite', true)
            });

            

            // , action.updateTaskAsync: tasksActions.updateTaskAsync(newUpd)
            // return { ...state };
        default:
            return state;
    }
};
