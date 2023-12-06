import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
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
            onItemAdded(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem
    }
}