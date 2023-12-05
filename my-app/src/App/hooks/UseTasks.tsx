import {useState} from "react";
import {v1} from "uuid";
import {dispatch, TaskStateType, todolistId1, todolistId2} from "../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {removeTodolistAC} from "../../state/todolists-reducer";

export function useTasks() {
    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Vov', isDone: false},
            {id: v1(), title: 'Apple', isDone: true},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    }
    function changeTasksTitle(taskId: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }

    function completelyRemoveTasksForTodolist(id: string){
        const action = removeTodolistAC(id);
        dispatch(action);
    }

    return {
        tasksObj,
        setTasks,
        removeTask,
        addTask,
        changeStatus,
        changeTasksTitle,
        completelyRemoveTasksForTodolist
    }
}