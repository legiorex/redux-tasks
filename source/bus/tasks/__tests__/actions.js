// Actions
import { tasksActions } from '../actions';

// Types
import { types } from '../types';

describe('tasks actions', () => {
    test('fillTasks', () => {
        expect(tasksActions.fillTasks(__.tasks)).toEqual({
            type:    types.FILL_TASKS,
            payload: __.tasks,
        });
    });
    test('createTask', () => {
        expect(tasksActions.createTask(__.tasks)).toEqual({
            type:    types.CREATE_TASK,
            payload: __.tasks,
        });
    });

    test('removeTask', () => {
        expect(tasksActions.removeTask(__.tasks)).toEqual({
            type:    types.REMOVE_TASK,
            payload: __.tasks,
        });
    });

    test('toggleFavoriteTask', () => {
        expect(tasksActions.toggleFavoriteTask(__.tasks)).toEqual({
            type:    types.TOGGLE_FAVORITE_TASK,
            payload: __.tasks,
        });
    });

    test('editMessageTask', () => {
        expect(tasksActions.editMessageTask(__.message)).toEqual({
            type:    types.EDIT_MESSAGE_TASK,
            payload: __.message,
        });
    });

    test('fetchTasksAsync', () => {
        expect(tasksActions.fetchTasksAsync()).toEqual({
            type: types.FETCH_TASKS_ASYNC,
        });
    });
    test('createTaskAsync', () => {
        expect(tasksActions.createTaskAsync(__.message)).toEqual({
            type:    types.CREATE_TASK_ASYNC,
            payload: __.message,
        });
    });

    test('removeTaskAsync', () => {
        expect(tasksActions.removeTaskAsync(__.taskId)).toEqual({
            type:    types.REMOVE_TASK_ASYNC,
            payload: __.taskId,
        });
    });

    test('updateTaskAsync', () => {
        expect(tasksActions.updateTaskAsync(__.tasks)).toEqual({
            type:    types.UPDATE_TASK_ASYNC,
            payload: __.tasks,
        });
    });

})
;
