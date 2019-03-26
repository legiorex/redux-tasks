// Core
import { put, apply } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../../tasks/actions";
import { uiActions } from "../../ui/actions";
import { fetchTasks } from "../saga/workers";

const fetchTasksAction = tasksActions.fetchTasksAsync(__.tasks);

const saga = cloneableGenerator(fetchTasks)(fetchTasksAction);
let clone = null;

describe("fetchTasks saga:", () => {
  describe("should pass until response received", () => {
    test("should dispatch startFetching action", () => {
      expect(saga.next().value).toEqual(put(uiActions.startFetching()));
    });

    test("should call a fetch request", () => {
      expect(saga.next().value).toEqual(apply(api, api.tasks.fetch));
      clone = saga.clone();
    });
  });

  describe("should handle a 400 status response", () => {
    test("a fetch request should return 400 status response", () => {
      expect(clone.next(__.fetchResponseFail400).value).toEqual(
        apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
      );
    });

    test("should contain a response data object", () => {
      expect(clone.next(__.responseDataFail).value).toEqual(
        put(uiActions.emitError(__.error, "fetchTasks worker"))
      );
    });

    test("should dispatch stopFetching action", () => {
      expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
    });

    test("should finish", () => {
      expect(clone.next().done).toBe(true);
    });
  });

  describe("should handle a 200 status response", () => {
    test("a fetch request should return a 200 status response data object", () => {
      expect(saga.next(__.fetchResponseSuccess).value).toEqual(
        apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
      );
    });

    test("should dispatch fillTasks action", () => {
      expect(saga.next(__.responseDataSuccess).value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Array [
        Object {
          "completed": true,
          "created": "TEST_CREATED",
          "favorite": false,
          "id": "TEST_ID",
          "message": "TEST_MESSAGE",
          "modified": "TEST_MODIFIED",
        },
        Object {
          "completed": true,
          "created": "TEST_CREATED",
          "favorite": false,
          "id": "TEST_ID",
          "message": "TEST_MESSAGE",
          "modified": "TEST_MODIFIED",
        },
      ],
      "type": "FILL_TASKS",
    },
    "channel": null,
  },
}
`);
    });

    test("should dispatch stopFetching action", () => {
      expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "STOP_FETCHING",
    },
    "channel": null,
  },
}
`);
    });

    test("should finish", () => {
      expect(saga.next().done).toBe(true);
    });
  });
});
