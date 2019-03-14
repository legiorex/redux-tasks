//Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';

export function* worker () {
    try {
        yield put(uiActions.startFetching());
        const response = yield apply(api, api.posts.fetch);

        yield put(postsActions.fillPosts(result.data));

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(postsActions.fillPosts(result.data));

    } catch (error) {

        yield put(uiActions.emitError(error, 'worker'));

    } finally {
        yield put(uiActions.stopFetching());
    }

}
