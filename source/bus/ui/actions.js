// Types
import { types } from './types';

export const uiActions = {
    startFetching: () => {
        return {
            type: types.START_FETCHING,
        };
    },

    stopFetching: () => {
        return {
            type: types.STOP_FETCHING,
        };
    },
    inputTask: (value) => {
        
        return {
            type:    types.INPUT_TASK,
            payload: value,
        };
    },
    clearTask: () => {
        return {
            type: types.CLEAR_TASK,
        };
    },

    emitError: (error, meta = null) => {
        return {
            type:    types.EMIT_ERROR,
            payload: error,
            error:   true,
            meta,
        };
    },
};
