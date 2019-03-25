// Core
import { put, apply } from 'redux-saga/effects';
import { expectSaga } from "redux-saga-test-plan";

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../../tasks/actions';
import { uiActions } from '../../ui/actions';
import { createTask } from "../saga/workers";

describe('createTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(createTask, tasksActions.createTaskAsync(__.message))
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.createTask, [__.message]), __.fetchResponseSuccess]])
            .put(tasksActions.createTask(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(createTask, tasksActions.createTaskAsync(__.message))
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.createTask, [__.message]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, 'createTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
