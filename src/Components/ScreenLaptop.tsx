import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

type ScreenLaptopProps = {
    text: string
    taskText: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const ScreenLaptop: React.FC<ScreenLaptopProps> = ({ taskText, onChange, onKeyDown, onKeyUp, text }) => {

    const inputStyle = {
        height: "100%",
        alignItems: 'start'
    };

    return (
        <Box sx={{ width: "100%", display: 'flex', position: 'relative' }}>
            <TextField
                sx={{ opacity: 0.3 }}
                fullWidth multiline minRows={10} value={taskText}
            />
            <TextField
                InputProps={{ style: inputStyle }}
                sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, border: 1, borderRadius: 1 }}
                value={text}
                multiline
                onKeyUp={onKeyUp} onKeyDown={onKeyDown}
                onChange={onChange}
            />
        </Box>

    )
}

export default ScreenLaptop;