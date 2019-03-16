// Types
import { types } from "./types";



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
    removeTask: (task) => {
        return {
            type:    types.REMOVE_TASK,
            payload: task,
        };
    },
    toggleFavoriteTask: (task) => {
        return {
            type:    types.TOGGLE_FAVORITE_TASK,
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
    removeTaskAsync: (taskId) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },
    updateTaskAsync: (updatedTask) => {
        return {
            type:    types.UPDATE_TASK_ASYNC,
            payload: updatedTask,
        };
    },

};
