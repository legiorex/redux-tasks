// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { createTask, getTasks } from './workers';

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}
function* watchGetTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, getTasks);
}

export function* watchTask () {
    yield all([call(watchCreateTask), call(watchGetTasks) ]);
}
