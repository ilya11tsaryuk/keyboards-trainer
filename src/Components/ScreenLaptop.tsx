import { Box, TextField } from "@mui/material";
import React, { useRef } from "react";

type ScreenLaptopProps = {
    text: string
    taskText: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const ScreenLaptop: React.FC<ScreenLaptopProps> = ({ taskText, onChange, onKeyDown, onKeyUp, text }) => {
    const taskTextRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    const handleScroll = (event: React.UIEvent<HTMLInputElement>) => {
        console.log("working")
        const { scrollTop } = event.currentTarget;
        const targetInput = event.currentTarget.id === 'input1' ? 'input2' : 'input1';
        const targetInputRef = targetInput === 'input1' ? taskTextRef : textRef;

        if (targetInputRef.current) {
            targetInputRef.current.scrollTop = scrollTop;
        }
    };

    return (
        <Box sx={{
            width: "100%", display: 'flex',
             position: 'relative'
        }}>
            <TextField
                inputRef={taskTextRef}
                inputProps={{ id: 'input1', onScroll: handleScroll, border: 'none' }} // вот так работает синхронный скрол
                sx={{ opacity: 0.3, outline: 'none', whiteSpace: 'pre-wrap' }}
                fullWidth multiline
                minRows={10}
                maxRows={10}
                value={taskText}
            />
            <TextField
                // InputProps={{ style: inputStyle}} // работает без этого
                multiline={true}
                minRows={10}
                maxRows={10}
                sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, }} // add border
                value={text}
                onKeyUp={onKeyUp} onKeyDown={onKeyDown}
                onChange={onChange}
                inputProps={{ id: 'input2', onScroll: handleScroll }}
                inputRef={textRef}
            />
        </Box>

    )
}

export default ScreenLaptop;