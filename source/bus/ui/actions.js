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

    checkedAllTasks: (tasks) => {

        return {
            type:    types.CHECK_ALL_TASKS,
            payload: tasks,
        };
    },

    editTaskMessage: (newMessage) => {
        return {
            type:    types.NEW_MESSAGE_TASK,
            payload: newMessage,
        };
    },
    
    startEditingTask: (idTask) => {
        return {
            type:    types.START_EDITING_TASK,
            payload: idTask,
        };
    },
    finishEditingTask: () => {
        return {
            type: types.FINISH_EDITING_TASK,
        };
    },

    prevMessage: (message) => {
        return {
            type:    types.PREV_MESSAGE,
            payload: message,
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
