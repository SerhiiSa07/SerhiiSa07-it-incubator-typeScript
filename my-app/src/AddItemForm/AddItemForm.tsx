import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem} = useAddItemForm(props.addItem)

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
});