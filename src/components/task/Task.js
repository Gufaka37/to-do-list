import React from "react";
import "./task.css";
import { ReactComponent as Delete } from "../../svgs/task_delete.svg";
import { ReactComponent as Edit } from "../../svgs/task_edit.svg";

export const Task = ({ task, deleteTask, editTask, changeComplete }) => {
    return (
      <div className={`task ${task.completed ? "task-completed" : ""}`}>
          <input
              type="checkbox"
              checked={task.completed}
              id={task.id}
              onChange={() => changeComplete({
                  userId: task.userId,
                  id: task.id,
                  title: task.title,
                  completed: !task.completed
              })}/>
          <label htmlFor={task.id}>{task.title}</label>
          <div className={`${task.completed ? "taskAction" : "taskActions"}`}>
              <Edit onClick={() => editTask(task)}  className={`${task.completed ? "disable" : ""}`} />
              <Delete onClick={() => deleteTask(task.id)} />
          </div>
      </div>
    );
}