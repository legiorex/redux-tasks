// Core
import { Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    checkedAllTasksCompleted: false,
    isFetching:               false,
    valueInputTask:           '',
    newMessage:               '',
    prevMessage:              '',
    editingTaskId:            null, //или нул или строка id

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
            return state.set('valueInputTask', '');

        case types.CHECK_ALL_TASKS:

            const checked = action.payload.every((task) => {
                return task.get('completed');
            });

            return state.set('checkedAllTasksCompleted', checked);

        case types.START_EDITING_TASK:
            return state.set('editingTaskId', action.payload);

        case types.FINISH_EDITING_TASK:
            return state.set('editingTaskId', null);

        case types.NEW_MESSAGE_TASK:
            return state.set('newMessage', action.payload);

        case types.PREV_MESSAGE:
            return state.set('prevMessage', action.payload);

        default:
            return state;
    }
};
