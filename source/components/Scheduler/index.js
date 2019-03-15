// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
// import { tasks } from './tasks';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../Spinner'

// Actions
import { tasksActions  } from '../../bus/tasks/actions'
import { uiActions } from '../../bus/ui/actions';

const mapStateToProps = (state) => {

    return {
        tasks: state.tasks,
        valueInputTask: state.ui.get('valueInputTask')
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({ ...tasksActions, ...uiActions }, dispatch),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {

   
    componentDidMount() {
        const { actions } = this.props;        
        actions.fetchTasksAsync()
    };

    _createTaskAsync = (event) => {
        event.preventDefault();
        
        const { valueInputTask, actions } = this.props;
        

        if (!valueInputTask) {
            return null;
        }
        actions.createTaskAsync(valueInputTask);
        actions.clearTask();
    }
    _updateNewTaskMessage = (event) => {
        
        const { inputTask } = this.props.actions;
        inputTask(event.target.value)
    };


    render () {
        const { valueInputTask, tasks, actions } = this.props;

        const todoList = tasks.map((task) => {            
            return (<Task
                actions = {actions}
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                { ...task }
            />);
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner/>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit={this._createTaskAsync}>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value={valueInputTask}
                                onChange={this._updateNewTaskMessage}
                                
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
