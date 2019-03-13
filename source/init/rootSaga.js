// Watchers
import { watchCreateTask } from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield watchCreateTask();
}
