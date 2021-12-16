import React from "react";
import "./completedTasks.css";
import {Task} from "../task/Task";

export const CompletedTasks = ({ tasks, deleteTask, changeComplete, completedTasks }) => {
    return (
      <div className="completedTasksContent">
        <p>Completed ({completedTasks})</p>
        <div className="completedTasksList">
            {/* eslint-disable-next-line array-callback-return */}
            {tasks.map((task) => {
                if (task.completed)
                    return <Task key={task.id} task={task} deleteTask={deleteTask} changeComplete={changeComplete} />
            })}
        </div>
      </div>
    );
}