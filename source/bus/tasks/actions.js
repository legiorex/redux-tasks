// Types
import { types } from "./types";

// Instruments
import { api } from '../../REST';
import { async } from "q";
// export const tasksActions = {

//     // Sync

//     fillTasks: (tasks) => {
//         return {
//             type:    types.FILL_TASKS,
//             payload: tasks,
//         };
//     },

//     // Async

//     fetchTasksAsync: () => (dispatch, getState) => {
//         dispatch({
//             type: types.FETCH_TASKS_ASYNC,
//         });
//     },

// };

export const fillTasks = (tasks) => {
    console.log(tasks);

    return {
        type:    types.FILL_TASKS,
        payload: tasks,
    };
};
export const createTask = (task) => {
    return {
        type:    types.CREATE_TASK,
        payload: task,
    };
};

export const fetchTasksAsync = () => async (dispatch, getState) => {
    dispatch({
        type: types.FETCH_TASKS_ASYNC,
    });
    const response = await api.tasks.fetch();
    const result = await response.json();

    // console.log(result.data);

    dispatch(fillTasks(result.data));

};
export const createTaskAsync = (newTaskMessage) => async (dispatch) => {
    dispatch({
        type: types.CREATE_TASK_ASYNC,
    });
    // console.log(getState());
    const response = await api.tasks.createTask(newTaskMessage);
    const result = await response.json();

    dispatch(createTask(result.data));

};
