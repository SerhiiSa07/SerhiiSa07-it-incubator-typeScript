import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import "./Todolist.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (id: string, newTitle: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo( function (props: PropsType)  {
    console.log('Todolist is called');

    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const onAllClickHandler = useCallback (() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback (() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback (() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodolist = () => {

        props.removeTodolist(props.id)

    }
    const changeTodolistTitle = useCallback((newTitle: string) => {

        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle]);

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist= props.tasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => <Task removeTask={props.removeTask} changeTasksStatus={props.changeTasksStatus} changeTasksTitle={props.changeTasksTitle} task={t} todolistId={props.id} key={t.id}/>
                    )
                }
            </div>
            <div className='title'>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

