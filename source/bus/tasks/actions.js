// Types
import { types } from "./types";

// Instruments
import { api } from '../../REST';

export const tasksActions = {

    // Sync

    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },

    // Async

    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };

    },
    createTaskAsync: (newTaskMessage) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: newTaskMessage,
        };
    },

};
