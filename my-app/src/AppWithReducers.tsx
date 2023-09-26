import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import { Menu } from '@mui/icons-material';
import {useDispatch} from 'react-redux'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const dispatch = useDispatch();

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ]);
    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer,{
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
    function removeTask(id: string, todolistId: string) {
        dispatchTasksReducer(removeTaskAC(id, todolistId));
    }
    function addTask(title: string, todolistId: string) {
        dispatchTasksReducer(addTaskAC(title, todolistId));
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
    }
    function changeTasksTitle(taskId: string, title: string, todolistId: string) {
        dispatchTasksReducer(changeTaskTitleAC(taskId, title, todolistId))
    }
    function changeFilter(value: FilterValuesType, todolistId: string ) {
        const action = changeTodolistTitleAC(value, todolistId);
        dispatchTodolistsReducer(action)
    }
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchTasksReducer(action);
        dispatchTodolistsReducer(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatchTodolistsReducer(action);
    }
    function addTodolist(title: string){
        const action = addTodolistAC(title)
        dispatchTasksReducer(action);
        dispatchTodolistsReducer(action);
    }

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '20px'} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                    <Todolist
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
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
export default AppWithReducers;
