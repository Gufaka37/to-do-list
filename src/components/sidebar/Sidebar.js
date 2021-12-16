import React from "react";
import './sidebar.css';
import { ReactComponent as TasksMenu } from "../../svgs/tasks_menu.svg";

export const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="tasksMenu">
            <TasksMenu />
        </div>
      </div>
    );
}