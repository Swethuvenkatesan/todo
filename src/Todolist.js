import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { v4 as uuid } from "uuid";

export default function Todolist() {

    function getStoredTodos() {
        let data = localStorage.getItem("todos");
        let json = JSON.parse(data);
        if (json) {
            return json;
        }
        return [];
    }

    const [todos, setTodos] = useState(getStoredTodos());

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(event) {
        event.preventDefault();

        let task = event.target.task.value;

        if (!task) {
            alert("Please provide a valid task");
            return;
        }

        setTodos([...todos, { id: uuid(), task: task, completed: false, completedDate: null }]);

        event.target.reset();
    }

    function changeTaskStatus(id) {
        let newTodos = [...todos];
        var index = newTodos.findIndex(item => item.id == id);
        newTodos[index].completed = !newTodos[index].completed;
        if (newTodos[index].completed) {
            newTodos[index].completedDate = new Date().toLocaleString();
        } else {
            newTodos[index].completedDate = null;
        }
        setTodos(newTodos);
    }

    function deleteTask(id) {
        let newTodos = [...todos];
        var index = newTodos.findIndex(item => item.id == id);
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div className="container my-5">
            <div className="mx-auto rounded border p-4" style={{ width: "600px", backgroundColor: "blue" }}>
                <h2 className="text-white text-center mb-5">MY TODO LIST</h2>

                <form className="d-flex" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="New Task" name="task" />
                    <button className="btn btn-outline-light" type="submit">Add</button>
                </form>

                <h3 className="text-white mt-4">Pending Tasks</h3>
                {
                    todos.filter(todo => !todo.completed).map((todo, index) => (
                        <div key={index} className="rounded mt-4 p-2 d-flex"
                            style={{ backgroundColor: "aqua" }}>

                            <div className="me-auto">
                                {todo.task}
                            </div>

                            <div>
                                <i className={`h5 me-2 bi ${todo.completed ? 'bi-check-square-fill' : 'bi-square'}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => changeTaskStatus(todo.id)}></i>
                                <i className="bi bi-trash text-danger h5"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteTask(todo.id)}></i>
                            </div>
                        </div>
                    ))
                }

                <h3 className="text-white mt-4">Completed Tasks</h3>
                {
                    todos.filter(todo => todo.completed).map((todo, index) => (
                        <div key={index} className="rounded mt-4 p-2 d-flex"
                            style={{ backgroundColor: "#00ff00" }}>

                            <div className="me-auto">
                                {todo.task}
                                <small className="text-muted ms-2">Completed on: {todo.completedDate}</small>
                            </div>

                            <div>
                                <i className={`h5 me-2 bi ${todo.completed ? 'bi-check-square-fill' : 'bi-square'}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => changeTaskStatus(todo.id)}></i>
                                <i className="bi bi-trash text-danger h5"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteTask(todo.id)}></i>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 


