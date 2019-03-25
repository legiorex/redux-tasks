// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
export function* removeTask ({ payload: taskId }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.removeTask, [taskId]);

        if (response.status !== 204) {            
            throw new Error();
        }
        yield put(tasksActions.removeTask(taskId));

    } catch (error) {
        yield put(uiActions.emitError(error, 'removeTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
