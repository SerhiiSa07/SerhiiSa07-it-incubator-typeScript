import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    console.log('Error called')

    let [title, setTitle] = useState('');
    let [error, setError] = useState <string | null> (null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (error !== null){
            setError(null)
        }


        if (e.keyCode  === 13) {
            addItem();
        }
    }
    const addItem = () => {

        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
}