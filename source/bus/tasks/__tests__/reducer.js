// Core
import { fromJS, List } from "immutable";

// Instruments
import { types } from '../types';
import { tasksActions } from '../actions';
import { tasksReducer } from '../reducer';
import { sortTasksByGroup } from '../../../instruments/helpers';

const initialState = List();

describe('tasks reducer', () => {
    test('should return initial state by default', () => {
        expect(tasksReducer(void 0, {})).toEqual(initialState);
    });
    test('should handler FILL_TASKS action', () => {
        expect(
            tasksReducer(void 0, tasksActions.fillTasks(__.tasks))
        ).toEqual(fromJS(sortTasksByGroup(__.tasks)));
    });
    test('should handler CREATE_TASK action', () => {
        expect(
            tasksReducer(void 0, tasksActions.createTask(__.tasks))
        ).toEqual(initialState.unshift(fromJS(__.tasks)));
    });
    test('should handler REMOVE_TASK action', () => {
        expect(
            tasksReducer(void 0, tasksActions.removeTask(__.taskID))
        ).toEqual(initialState.filter((task) => {
            return task.get("id") !== __.taskID;
        }));
    });

    // test("should handler EDIT_MESSAGE_TASK action", () => {
    //     expect(
    //         tasksReducer(void 0, tasksActions.editMessageTask(__.editMessage))
    //     ).toEqual(__.tasks.update(__.editMessage.get('index'), (task) => {
    //         return task.set('message', __.editMessage.get('message'));
    //     }));
    // });
});
