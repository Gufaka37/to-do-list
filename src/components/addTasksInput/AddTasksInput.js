import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import './addTasksInput.css';

export const AddTasksInput = forwardRef(({ addTask, saveTask, tasks}, ref) => {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [lastTaskId, setLastTaskId] = useState(1);
    const [task, setTask] = useState({
       userId: 1, id: 1, title: '', completed: false
    });

    useEffect(() => {
        if (tasks.length !== 0) {
            setLastTaskId((tasks.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id) + 1);
        }
    }, [tasks]);

    useEffect(() => {
        setTask((task) => { return {...task, id: lastTaskId} });
    }, [lastTaskId, setTask]);

    useImperativeHandle(ref, () => ({

       startEdit(task) {
           setEdit(true);
           setTask(task);
       }
    }));

    const handlePressKey = event => {
        if (!edit && event.key === "Enter")
            add();
        if (edit && event.key === "Enter")
            save();
    }

    const changeTitle = event => {
        setTask({...task, title: event.target.value});
        if (edit)
            saveTask(task);
    }

    const refreshTask = () => {
        setTask({...task, id: lastTaskId, title: ''});
    }

    const add = () => {
        if (task.title === '')
            setError(true);
        else {
            setTask({...task, id: lastTaskId});
            setLastTaskId(lastTaskId + 1);
            addTask(task);
            refreshTask();
            setError(false);
        }
    }

    const save = () => {
        if (task.title === '')
            setError(true);
        else {
            saveTask(task);
            refreshTask();
            setEdit(false);
            setError(false);
        }
    }

    return (
      <div className="addTask">
        <input
            className={`${error ? 'error' : ''}`}
            placeholder={`${edit ? 'Edit a task' : '+ Add a task'}, press Enter to save`}
            onChange={changeTitle}
            onKeyPress={handlePressKey}
            value={task.title}
        />
        <button onClick={add} className={`${edit ? 'disable' : ''}`}>
            Add
        </button>
        <button onClick={save} className={`${!edit ? 'disable' : ''}`}>
            Save
        </button>
      </div>
    );
});