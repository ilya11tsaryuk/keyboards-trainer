import { Box, Button, Grid, } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';

type PropsKeyBoard = {
    listButton: { id: number, value: string }[];

}

const KeyBoard: React.FC<PropsKeyBoard> = ({ listButton }) => {

    const totalColumns = 14;
    const minButtonWidth = 100 / totalColumns;
    const apostropheButtonWidth = minButtonWidth * 0.7 - 1;
    const capsButtonWidth = minButtonWidth * 1.3 - 1;
    const enterButtonWidth = minButtonWidth * 1.7 - 1;
    const shiftButtonWidth = minButtonWidth * 2 - 1;
    const spaceButtonWidth = minButtonWidth * 8 - 1;
    const ctrlButtonWidth = minButtonWidth * 1.5 - 1;
    const altButtonWidth = minButtonWidth * 1.5 - 1;
    const backspaceButtonWidth = minButtonWidth * 1.3 - 1;

    const getButtonWidth = (value: string) => {
        if (value === "`") {
            return `${apostropheButtonWidth}%`;
        }
        if (value === "CAPS") {
            return `${capsButtonWidth}%`;
        }
        if (value === "ENTER") {
            return `${enterButtonWidth}%`;
        }
        if (value === "SHIFT") {
            return `${shiftButtonWidth}%`;
        }
        if (value === "SPACE") {
            return `${spaceButtonWidth}%`;
        }
        if (value === "CTRL") {
            return `${ctrlButtonWidth}%`;
        }
        if (value === "ALT") {
            return `${altButtonWidth}%`;
        }
        if (value === "BCSP") {
            return `${backspaceButtonWidth}%`;
        }
        return `${minButtonWidth}%`;
    };

    return (
        <Grid justifyContent={'space-between'} container>
            {listButton.map((button) => (
                <Grid sx={{ width: getButtonWidth(button?.value), textAlign: 'center', marginY: "2px" }} item key={button.id}>
                    <Button size="small" key={button.id} sx={{ border: 1, minWidth: `95%` }}>
                        {button?.value}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default KeyBoard;