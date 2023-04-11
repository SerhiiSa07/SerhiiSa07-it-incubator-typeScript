import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";
function App(){
    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("active");

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks);
    }

    let taskForTodolist = tasks;
    if (filter === "completed"){
        taskForTodolist = tasks.filter( t => t.isDone === true);
    }
    if (filter === "active"){
        taskForTodolist = tasks.filter( t => t.isDone === false);
    }

  return (
      <div className='App'>
        <Todolist title = 'What to learn'
                  tasks={taskForTodolist}
                  removeTask={removeTask}
        />
      </div>
  );
}

export default App;
