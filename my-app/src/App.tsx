import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId]  = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist){
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let removeTodolist = (todolistId1: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId1)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId1];
        setTasks({...tasksObj});
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>> ([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ]);

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]:[
            {id: v1(), title: 'Vov', isDone: false},
            {id: v1(), title: 'Apple', isDone: true},
        ]
    });

    function addTodolist(title: string){
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title

        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id] : []
        })
    }

    return (
        
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active"){
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed"){
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }

                    return <Todolist
                                     key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTasksStatus={changeStatus}
                                     changeTasksTitle={changeTasksTitle}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                    />

                })
            }
        </div>
    );
}


export default App;
