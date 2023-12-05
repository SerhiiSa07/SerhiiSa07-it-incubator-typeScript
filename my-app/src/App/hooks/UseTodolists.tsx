import {useState} from "react";
import {dispatch, FilterValuesType, TodolistType} from "../../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolists-reducer";

export function useTodolists() {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        /*{id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}*/
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action);
    }
    function addTodolist(title: string){
        const action = addTodolistAC(title)
        dispatch(action);
    }

    return {
        todolists,
        setTodolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }

}