import React from "react";
import { Box } from "@mui/material"
import ScreenLaptop from "./ScreenLaptop";
import TypingInfo from "./TypingInfo";
import KeyBoard from "./KeyBoard";
import ModalResult from "./ModalResult";
import Dashboard from "./Dashboard";

type ListButtonType = {
    id: number;
    value: string
}

export type ContainerProps = {
    restart: () => void;
    text: string;
    handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleScreen: (event: React.ChangeEvent<HTMLInputElement>) => void;
    taskText: string;
    buttonList: ListButtonType[];
    visibleModal: boolean;
    closeModal: () => void
}

const Container: React.FC<ContainerProps> = ({
    text, handleKeyUp, handleKeyDown,
    handleScreen, taskText, buttonList,
    restart, visibleModal, closeModal }) => {
    return (

        <Box sx={{ width: "60%", margin: 'auto' }}>
            <Dashboard restart={restart} />
            <Box sx={{ display: 'flex', gap: 1, marginY: 2, }}>
                <ScreenLaptop text={text} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={handleScreen} taskText={`${taskText}`} />
                <TypingInfo />
            </Box >
            <KeyBoard listButton={buttonList} />
            <ModalResult visibleModal={visibleModal} closeModal={closeModal} />
        </Box >
    )
}

export default Container