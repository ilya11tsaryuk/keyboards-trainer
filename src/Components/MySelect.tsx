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
        <Select
        MenuProps={{style: {borderRadius: 5, margin: 2, backgroundColor: 'black', },}}
            size="small" sx={{borderRadius: 5, }} value={defaultValue}
            onChange={handleChange} >
            {
                menuItems.map((menuItem) => (
                    <MenuItem sx={{ borderRadius: 4 }} key={menuItem.id} value={menuItem.value}>
                        {menuItem.value}
                    </MenuItem>
                ))
            }
        </Select >
    )
}

export default MySelect 