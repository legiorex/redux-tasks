// Instruments
import { MAIN_URL, TOKEN } from "./config";

export const api = {
    tasks: {
        fetch () {
            return fetch(MAIN_URL, {
                method:  "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  TOKEN,
                },
            });
        },
        createTask (newTask) {
            return fetch(MAIN_URL, {
                method:  "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  TOKEN,
                },
                body: JSON.stringify({ message: newTask }),
            });
        },

        removeTask (taskId) {
            return fetch(`${MAIN_URL}/${taskId}`, {
                method:  "DELETE",
                headers: {
                    Authorization: TOKEN,
                },
            });
        },
    },
};
