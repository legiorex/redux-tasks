// Core
import { fromJS, Map } from "immutable";

// Instruments
import { types } from '../types';
import { uiActions } from "../actions";
import { uiReducer } from "../reducer";
import { sortTasksByGroup } from '../../../instruments/helpers';

const initialState = Map({
    checkedAllTasksCompleted: false,
    isFetching:               false,
    valueInputTask:           '',
    newMessage:               '',
    prevMessage:              '',
    editingTaskId:            null, //или нул или строка id

});

describe('ui reducer', () => {
    test('should return initial state by default', () => {
        expect(uiReducer(void 0, {})).toEqual(initialState);
    });
    test('should handler START_FETCHING action', () => {
        expect(uiReducer(void 0, uiActions.startFetching())).toEqual(
            initialState.set("isFetching", true)
        );
    });

    test('should handler STOP_FETCHING action', () => {
        expect(uiReducer(void 0, uiActions.stopFetching())).toEqual(
            initialState.set('isFetching', false)
        );
    });

    test('should handler INPUT_TASK action', () => {
        expect(uiReducer(void 0, uiActions.inputTask(__.message))).toEqual(
            initialState.set('valueInputTask', __.message)
        );
    });

    test('should handler CLEAR_TASK action', () => {
        expect(
            uiReducer(void 0, uiActions.clearTask())
        ).toEqual(initialState.set('valueInputTask', ''));
    });

    test('should handler CHECK_ALL_TASKS action', () => {
        expect(
            uiReducer(void 0, uiActions.checkedAllTasks(__.tasks))
        ).toEqual(initialState.set('checkedAllTasksCompleted', __.tasks.every((task) => {
            return task.get('completed');
        })));
    });

    test('should handler START_EDITING_TASK action', () => {
        expect(
            uiReducer(void 0, uiActions.startEditingTask(__.taskID))
        ).toEqual(initialState.set('editingTaskId', __.taskID));
    });

    test('should handler FINISH_EDITING_TASK action', () => {
        expect(
            uiReducer(void 0, uiActions.finishEditingTask())
        ).toEqual(initialState.set('editingTaskId', null));
    });

    test('should handler NEW_MESSAGE_TASK action', () => {
        expect(
            uiReducer(void 0, uiActions.editTaskMessage(__.message))
        ).toEqual(initialState.set('newMessage', __.message));
    });

    test('should handler PREV_MESSAGE action', () => {
        expect(
            uiReducer(void 0, uiActions.prevMessage(__.message))
        ).toEqual(initialState.set('prevMessage', __.message));
    });

});
