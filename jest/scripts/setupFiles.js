// Core
import { Map, List } from "immutable";

// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

const successMessage = "TEST_SUCCESS_MESSAGE.";
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);
const taskID = 'TEST_ID';
const message = 'TEST_MESSAGE';
const editMessage = Map({
    index: 0,
    message,
});

const tasks = [{
    id:        taskID,
    message,
    completed: true,
    favorite:  false,
    created:   'TEST_CREATED',
    modified:  'TEST_MODIFIED',

}];

const task = {
    id:        taskID,
    message,
    completed: true,
    favorite:  false,
    created:   'TEST_CREATED',
    modified:  'TEST_MODIFIED',

};

const responseDataSuccess = {
    data:    tasks,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};
const fetchResponseSuccess204 = {
    status: 204,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const url = 'https://www.url.com';

global.__ = {
    tasks,
    task,
    message,
    taskID,
    errorMessage,
    token,
    error,
    editMessage,
    responseDataSuccess,
    responseDataFail,
    fetchResponseSuccess,
    fetchResponseSuccess204,
    fetchResponseFail401,
    fetchResponseFail400,    
    url,
};
global.fetch = fetch;
global.localStorage = new LocalStorage();
