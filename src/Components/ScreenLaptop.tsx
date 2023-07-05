import { TextField } from "@mui/material";
import React from "react";

type ScreenLaptopProps = {
    curentText: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const ScreenLaptop: React.FC<ScreenLaptopProps> = ({ curentText, onChange, onKeyDown }) => {
    return (
        <TextField onKeyDown={onKeyDown} fullWidth multiline rows={10} value={curentText} onChange={onChange} />
    )
}

export default ScreenLaptop;