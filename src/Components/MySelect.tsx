import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type MySelectProps = {
    menuItems: { id: number, value: string }[];
    styles?: React.CSSProperties;
    handleChange: (event: SelectChangeEvent<string>) => void;
    defaultValue: string
}

const MySelect: React.FC<MySelectProps> = ({ menuItems, styles, handleChange, defaultValue }) => {
    return (
        <Select size="small" sx={styles} value={defaultValue} onChange={handleChange}>
            {menuItems.map((menuItem) => (
                <MenuItem key={menuItem.id} value={menuItem.value}>
                    {menuItem.value}
                </MenuItem>
            ))}
        </Select>
    )
}

export default MySelect 