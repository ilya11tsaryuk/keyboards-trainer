import { TextField } from "@mui/material";
import React from "react";

type ScreenLaptopProps = {
    currentText: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const ScreenLaptop: React.FC<ScreenLaptopProps> = ({ currentText, onChange, onKeyDown, onKeyUp }) => {
    return (
        <TextField onKeyUp={onKeyUp} onKeyDown={onKeyDown} fullWidth multiline rows={10} value={currentText} onChange={onChange} />
    )
}

export default ScreenLaptop;