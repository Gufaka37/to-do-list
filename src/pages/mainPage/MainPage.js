import React, {useCallback, useEffect, useRef, useState} from "react";
import { AddTasksInput } from "../../components/addTasksInput/AddTasksInput";
import { Tag } from "../../components/tag/Tag";
import {TodoTasks} from "../../components/todoTasks/TodoTasks";
import './mainPage.css';
import {CompletedTasks} from "../../components/completedTasks/CompletedTasks";
import {useHttp} from "../../hooks/http.hook";

export const MainPage = () => {
    const [tasks, setTasks] = useState([
        // {userId: 1, id: 1, title: "Add Icons to Dashboard", completed: false}
    ]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [uncompletedTasks, setUncompletedTasks] = useState(0);
    const childRef = useRef();
    const { request } = useHttp();

    const fetchTasks =  useCallback(async () => {
        try {
            const fetched = await request('https://jsonplaceholder.typicode.com/todos');
            setTasks(fetched.data);
        } catch (e) {}

    }, [request]);

    useEffect(() => {
        setUncompletedTasks(0);
        setCompletedTasks(0);
        tasks.forEach((task) => {
            task.completed ? setCompletedTasks((completedTasks) => {
                return completedTasks + 1
            }) : setUncompletedTasks((uncompletedTasks) => {
                return uncompletedTasks + 1
            })
        })
    }, [tasks]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = async task => {
        try {
            const createdTask = await request('https://jsonplaceholder.typicode.com/todos', 'POST', {...task});
            console.log('Create response: ', createdTask.response);
            if (createdTask.response.ok)
                setTasks(tasks => [...tasks, task]);
        } catch (e) {}
    }

    // PUT did not do, need to rewrite the entire method. ))

    const saveTask = editedTask => {
        const newTasks = tasks.map((task) => {
            if (task.id === editedTask.id)
                task = editedTask;
            return task;
        });
        setTasks(newTasks);

        // try {
        //     const dataEditedTask = await request(`https://jsonplaceholder.typicode.com/todos/${editedTask.id}`, 'PUT', {...editedTask});
        //     console.log('Create response: ', dataEditedTask.response);
        //     if (dataEditedTask.response.ok) {
        //         const newTasks = tasks.map((task) => {
        //             if (task.id === editedTask.id)
        //                 task = dataEditedTask.data;
        //             return task;
        //         });
        //         setTasks(newTasks);
        //     }
        // } catch (e) {}
    }

    const deleteTask = async id => {
        try {
            const deletedTask = await request(`https://jsonplaceholder.typicode.com/todos/${id}`, 'DELETE');
            console.log('Create response: ', deletedTask.response);
            if (deletedTask.response.ok)
                setTasks(tasks.filter((task) => {return task.id !== id}));
        } catch (e) {}
    }

    const editTask = task => {
        childRef.current.startEdit(task);
    }

    const changeComplete = changedTask => {
        const newTasks = tasks.filter((task) => { return task.id !== changedTask.id });
        newTasks.push(changedTask);
        setTasks(newTasks);
    }

    return (
        <div className="todosPage">
            <div className="content">
                <div className="tasks">
                    <AddTasksInput tasks={tasks} addTask={addTask} saveTask={saveTask} ref={childRef}/>
                    <div className="tags">
                        <Tag title="Total" type="total" tasks={tasks.length} />
                        <Tag title="To do" type="todo" uncompletedTasks={uncompletedTasks} />
                        <Tag title="Completed" type="completed" completedTasks={completedTasks} />
                    </div>
                    <TodoTasks
                        tasks={tasks}
                        uncompletedTasks={uncompletedTasks}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        changeComplete={changeComplete}
                    />
                </div>
                <div className="completedTasks">
                    <CompletedTasks
                        tasks={tasks}
                        completedTasks={completedTasks}
                        deleteTask={deleteTask}
                        changeComplete={changeComplete}
                    />
                </div>
            </div>
        </div>
    );
}