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
        default:
            return state;
    }
};
