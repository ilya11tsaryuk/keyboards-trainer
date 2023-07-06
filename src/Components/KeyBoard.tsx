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
    const capsButtonWidth = minButtonWidth * 1.3;
    const enterButtonWidth = minButtonWidth * 1.7;
    const shiftButtonWidth = minButtonWidth * 2;
    const spaceButtonWidth = minButtonWidth * 5;

    const getButtonWidth = (value: string) => {
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
        return `${minButtonWidth}%`;
    };

    return (
        <Grid justifyContent={'center'} container>
            {listButton.map((button) => (
                <Grid sx={{ width: getButtonWidth(button?.value), margin: 'auto' }} item key={button.id}>
                    <Button size="small" key={button.id} sx={{ border: 1, width: "20px", minWidth: `90%` }}>
                        {button?.value}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default KeyBoard;