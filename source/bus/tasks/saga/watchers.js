// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { createTask } from './workers';

export function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask)
}
