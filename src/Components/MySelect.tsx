import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type MySelectProps = {
    menuItems: { id: number, value: string, type: string }[];
    styles?: React.CSSProperties;
    handleChange: (event: SelectChangeEvent<string>) => void;
    defaultValue: string
}

const MySelect: React.FC<MySelectProps> = ({ menuItems, styles, handleChange, defaultValue }) => {
    return (
        <Select
            multiline
            size="small" sx={{}} value={defaultValue} // убрать подсветку при фокусе
            onChange={handleChange} >
            {
                menuItems.map((menuItem) => (
                    <MenuItem sx={{ borderRadius: 4 }} key={menuItem.id} value={menuItem.value}>
                        {menuItem.value.length < 2 ? `${menuItem.type}: ${menuItem.value}` : menuItem.value}
                    </MenuItem>
                ))
            }
        </Select >
    )
}

export default MySelect 