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
        editingTaskId: state.ui.get("editingTaskId"),
        checkedAllTasksCompleted: state.ui.get("checkedAllTasksCompleted"),
        valueInputTask: state.ui.get("valueInputTask"),
        prevMessage: state.ui.get('prevMessage')
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

    componentDidUpdate = () => {
        const { tasks, actions } = this.props;
        actions.checkedAllTasks(tasks)
    }
    

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

    _toggleAllTasksCompleted = () => {
        const { tasks, actions, checkedAllTasksCompleted } = this.props;
        
        const completedTasks = tasks.map((task) => {
            return task.set('completed', !checkedAllTasksCompleted);
        });
        
        actions.updateTaskAsync(completedTasks);
    }
    

    render () {
        const {
          valueInputTask,          
          checkedAllTasksCompleted,
          tasks,
          actions,
          editingTaskId,
          prevMessage,
        } = this.props;

        const todoList = tasks.map((task) => {            
            return (
              <Task
                prevMessage={prevMessage}
                editingTaskId={editingTaskId} 
                tasks={tasks}
                task={task}
                actions={actions}
                completed={task.get("completed")}
                favorite={task.get("favorite")}
                id={task.get("id")}
                key={task.get("id")}
                message={task.get("message")}
                {...task}
              />
            );
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
                        <Checkbox                             
                            color1 = '#363636' 
                            color2 = '#fff' 
                            checked={checkedAllTasksCompleted}
                            onClick={this._toggleAllTasksCompleted}
                            />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
