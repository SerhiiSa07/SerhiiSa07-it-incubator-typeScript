import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

const removeTaskCallback = action("Task changed")
const changeTasksStatusCallback = action("Status changed")
const changeTasksTitleCallback = action("Title changed")

export const TaskBaseExample = () => {
    return <>
        <Task
            removeTask={removeTaskCallback}
            changeTasksStatus={changeTasksStatusCallback}
            changeTasksTitle={changeTasksTitleCallback}
            task={{id: '1', isDone: true, title: 'CSS'}}
            todolistId={'todolistId1'}
        />
        <Task
            removeTask={removeTaskCallback}
            changeTasksStatus={changeTasksStatusCallback}
            changeTasksTitle={changeTasksTitleCallback}
            task={{id: '2', isDone: false, title: 'JS'}}
            todolistId={'todolistId2'}
        />
    </>
}