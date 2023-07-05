import { Box, Button, } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';

type PropsKeyBoard = {
    listButton: { id: number, value: string }[];

}

const KeyBoard: React.FC<PropsKeyBoard> = ({ listButton }) => {

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: 'repeat(14, 1fr)', gap: "3px" }}>
            {listButton.map((button) => (
                <Button key={button.id} sx={{ width: "7%" }}>
                    {button?.value}
                </Button>
            ))}
        </Box>
    )
}

export default KeyBoard;