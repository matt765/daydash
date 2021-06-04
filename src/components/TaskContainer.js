import React from 'react'
import SingleTask from './SingleTask.js';

function TaskContainer(props) {
    const tasksOutput = props.tasks.map((task) => (
        <SingleTask
          message={task.message}
          index={task.index}
          crossed={task.crossed}
          handleRemove={props.handleRemove}
          handleCross={props.handleCross}
        />
    ));
    return (
        <div className="task-container">
           {tasksOutput}
        </div>
    )
}

export default TaskContainer