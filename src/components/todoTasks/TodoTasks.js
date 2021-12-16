import React from "react";
import "./todoTasks.css";
import {Task} from "../task/Task";

export const TodoTasks = ({ tasks, deleteTask, editTask, changeComplete, uncompletedTasks }) => {
    return (
      <div className="todo">
          <p>To do ({uncompletedTasks})</p>
          <div className="todo-tasks">
              {
                  // eslint-disable-next-line array-callback-return
                  tasks.map((task) => {
                      if (task.completed === false)
                        return <Task
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            changeComplete={changeComplete}
                        />
                  })
              }
          </div>
      </div>
    );
}