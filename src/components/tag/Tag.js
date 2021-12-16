import React from "react";
import "./tag.css";

export const Tag = ({ type, title, tasks, completedTasks, uncompletedTasks }) => {
    return (
      <div className={`tag-${type} tag`}>
          <p className={`${type !== "total" ? "disable": "" }`}>{title}: {tasks}</p>
          <p className={`${type !== "completed" ? "disable": "" }`}>{title}: {completedTasks}</p>
          <p className={`${type !== "todo" ? "disable": "" }`}>{title}: {uncompletedTasks}</p>
      </div>
    );
}