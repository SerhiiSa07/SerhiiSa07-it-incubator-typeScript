import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.removeTask, props.todolistId])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTasksStatus(props.task.id, newIsDoneValue, props.todolistId);
    }, [props.task.id, props.changeTasksStatus, props.todolistId])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTasksTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.changeTasksTitle, props.todolistId])


    return <div key={props.task.id}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})