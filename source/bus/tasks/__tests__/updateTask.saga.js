// Core
import { put, apply } from 'redux-saga/effects';
import { expectSaga } from "redux-saga-test-plan";

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../../tasks/actions';
import { uiActions } from '../../ui/actions';
import { updateTask } from "../saga/workers";

describe('updateTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(updateTask, tasksActions.updateTaskAsync(__.tasks))
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.updateTask, [__.tasks]), __.fetchResponseSuccess]])
            .put(tasksActions.fillTasks(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTask, tasksActions.updateTaskAsync(__.tasks))
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.updateTask, [__.tasks]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'updateTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
