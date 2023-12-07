import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {useCallback} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolists-reducer";
import {FilterValuesType, TaskStateType, TodolistType} from "../AppWithRedux";

export const useAppWithRedux = () => {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>( state => state.tasks)

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    }, [])

    const changeStatus = useCallback(function (taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    }, [dispatch])

    const changeTasksTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback( function (id: string, newTitle: string)  {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback ( (title: string) =>  {
        const action = addTodolistAC(title)
        dispatch(action);
    }, [dispatch]);

    return {
        todolists,
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTasksTitle,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}