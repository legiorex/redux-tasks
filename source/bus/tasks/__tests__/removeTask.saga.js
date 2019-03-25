// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from "redux-saga-test-plan";

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../../tasks/actions';
import { uiActions } from '../../ui/actions';
import { removeTask } from '../saga/workers';


describe('removeTask saga:', () => {
    test('should complete a 204 status response scenario', async () => {
        await expectSaga(removeTask, tasksActions.removeTaskAsync(__.taskID))
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.removeTask, [__.taskID]), __.fetchResponseSuccess204]])
            .put(tasksActions.removeTask(__.taskID))
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(removeTask, { type: 'REMOVE_TASK', payload: 'TEST_ID' })
            .provide([[apply(api, api.tasks.removeTask, [__.taskID]), __.fetchResponseFail400]])
            .put(uiActions.startFetching())
            .put(uiActions.emitError(new Error(), 'removeTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });

});
