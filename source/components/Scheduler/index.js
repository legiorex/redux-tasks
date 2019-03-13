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

// Actions
import { fetchTasksAsync, createTaskAsync  } from '../../bus/tasks/actions'

const mapStateToProps = (state) => {

    return {
        tasks: state.tasks,
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({ fetchTasksAsync, createTaskAsync }, dispatch),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {

    state = { 
        newTaskMessage: "",
        
    };

    componentDidMount() {
        const { actions } = this.props;        
        actions.fetchTasksAsync()
    };

    _createTaskAsync = (event) => {
        event.preventDefault();
        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return null;
        }
        this.props.actions.createTaskAsync(newTaskMessage)
        
        // console.log(newTaskMessage)
        
    }
    _updateNewTaskMessage = (event) => {
        this.setState({ newTaskMessage: event.target.value });
    };


    render () {

        const {newTaskMessage} = this.state;
        const { tasks } = this.props;
        // console.log('список задач',tasksNew)
        

        const todoList = tasks.map((task) => {
            return (<Task
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
                                value={newTaskMessage}
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
