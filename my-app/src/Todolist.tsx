import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: Function
}

export function Todolist(props: PropsType) {
    return (
        <div className='App'>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => <li><input type='checkbox' checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {props.removeTasks(t.id)}}>x</button>
                            </li>
                        )
                    }
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
                <div>
                    <input type="date" />
                    <input placeholder="date of birth"/>
                    <input type="button" value="text inside button"/>
                </div>
            </div>
        </div>
    )
}