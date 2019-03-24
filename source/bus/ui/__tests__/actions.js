// Actions
import { uiActions } from "../actions";

// Types
import { types } from '../types';

describe('ui actions', () => {
    test('start fetching tasks', () => {
        expect(uiActions.startFetching()).toEqual({
            type: types.START_FETCHING,
        });
    });
    test('stop fetching tasks', () => {
        expect(uiActions.stopFetching()).toEqual({
            type: types.STOP_FETCHING,
        });
    });

    test('inputTask', () => {
        expect(uiActions.inputTask(__.message)).toEqual({
            type:    types.INPUT_TASK,
            payload: __.message,
        });
    });

    test('clear task', () => {
        expect(uiActions.clearTask()).toEqual({
            type: types.CLEAR_TASK,
        });
    });

    test('checkedAllTasks', () => {
        expect(uiActions.checkedAllTasks(__.tasks)).toEqual({
            type:    types.CHECK_ALL_TASKS,
            payload: __.tasks,
        });
    });

    test('editTaskMessage', () => {
        expect(uiActions.editTaskMessage(__.message)).toEqual({
            type:    types.NEW_MESSAGE_TASK,
            payload: __.message,
        });
    });

    test('startEditingTask', () => {
        expect(uiActions.startEditingTask(__.taskID)).toEqual({
            type:    types.START_EDITING_TASK,
            payload: __.taskID,
        });
    });

    test('finishEditingTask', () => {
        expect(uiActions.finishEditingTask()).toEqual({
            type: types.FINISH_EDITING_TASK,
        });
    });

    test('prevMessage', () => {
        expect(uiActions.prevMessage(__.message)).toEqual({
            type:    types.PREV_MESSAGE,
            payload: __.message,
        });
    });
    test('emitError', () => {
        expect(uiActions.emitError(__.error, null)).toMatchSnapshot();
    });
});
