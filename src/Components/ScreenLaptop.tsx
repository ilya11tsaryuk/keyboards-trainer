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

    return (
        <Box sx={{ width: "80%", position: 'relative', height: "100%", display: 'flex' }}> 
            <TextField
                sx={{ opacity: 0.3, height: "100%" }}
                fullWidth multiline minRows={10} value={taskText}
                
            >
            </TextField>
            <Box>
                <TextField
                    value={text}
                    type="text"
                    onKeyUp={onKeyUp} onKeyDown={onKeyDown}
                    onChange={onChange}
                    fullWidth minRows={10} multiline
                    sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height: '100%' }} /> 
                    {/* position absolute */}
            </Box>
        </Box>

    )
}

export default ScreenLaptop;