// Core
import { Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    isFetching:     false,
    valueInputTask: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.INPUT_TASK:
            return state.set('valueInputTask', action.payload);

        case types.CLEAR_TASK:
            return state.set('valueInputTask', '')

        default:
            return state;
    }
};
