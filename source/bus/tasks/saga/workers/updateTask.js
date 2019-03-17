// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
export function* updateTask ({ payload: updatedTask }) {
    console.log('новый', updatedTask);
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.updateTask, [updatedTask]);
        const { data: tasks, message } = yield apply(response, response.json);
        console.log(tasks)

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }
        // yield put(tasksActions.createTask(task));
        yield put(tasksActions.fillTasks(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
