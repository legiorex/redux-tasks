// Core
import { createStore, combineReducers } from 'redux';

// Reducers
import { tasksReducer as tasks } from '../../bus/tasks/reducer';
import { uiReducer as ui } from '../../bus/ui/reducer';

// Store
import { store } from '../store';

export const referenceRootReducer = combineReducers({
    tasks,
    ui,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
