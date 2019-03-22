// Core
import React, { PureComponent, createRef } from 'react';
import cx from 'classnames';
import { Map } from 'immutable';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {

    taskInput = createRef();

    _removeTask = () => {
        const { id, actions } =this.props;

        actions.removeTaskAsync(id);
    }

    _updateTask = (value) => {

        const { tasks, task, actions } = this.props;

        const indexCurrentTask = tasks.findIndex((item) => {
            return item === task;
        });

        if (value === '') {
            return null;
        }

        if (value === 'favorite' || value ==='completed') {

            actions.updateTaskAsync(tasks.update(indexCurrentTask, (item) => {
                return item.set(`${value}`, !item.get(`${value}`));
            }));
        } else if (typeof value === 'string') {

            actions.updateTaskAsync(tasks.update(indexCurrentTask, (item) => {
                return item.set("message", value);
            }));
        }

    }

    _toggleFavoriteTask = () => {

        this._updateTask('favorite');
    }
    _toggleTaskCompletedState = () => {

        this._updateTask('completed');
    }

    _toggleEditTask = () => {
        const { id, actions, editingTaskId, message } = this.props;
        const currentInput = this.taskInput.current;

        if (editingTaskId) {
            this._finishEditingTask();

            return null;
        }

        currentInput.disabled = false;
        currentInput.focus();
        actions.startEditingTask(id);
        actions.prevMessage(message);
    }

    _finishEditingTask = () => {
        const { actions, message } = this.props;

        if (!message) {
            this.taskInput.current.setAttribute(
                'placeholder',
                'Введите название задачи');

            return null;
        }

        this.taskInput.current.disabled = true;

        actions.finishEditingTask();
        this._updateTask(message);
    }

    _updateNewTaskMessage = (event) => {
        const { tasks, task, actions } = this.props;

        const index = tasks.findIndex((item) => {
            return item === task;
        });

        const valueTask = Map({
            index,
            message: event.target.value,
        });

        actions.editMessageTask(valueTask);

    }
    _updateTaskMessageOnKeyDown = (event) => {
        const { actions, prevMessage } = this.props;

        if (event.key === "Enter") {
            this._finishEditingTask();
        } else if (event.key === "Escape") {

            this._updateTask(prevMessage);
            this.taskInput.current.disabled = true;

            actions.finishEditingTask();

        }
    };

    render () {

        const {
            editingTaskId,
            id,
            message,
            favorite,
            completed,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled
                        // disabled = { editingTaskId !== id }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { message }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleFavoriteTask }
                    />
                    <Edit
                        inlineBlock
                        checked = { editingTaskId === id }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        dataId = { id }
                        ref = { this.taskEdit }
                        onClick = { this._toggleEditTask }

                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
