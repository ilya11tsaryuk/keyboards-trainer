import React from "react";
import { Button, useTheme } from "@mui/material"
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { darkSecondaryColor, lightSVGicon, lightSecondaryBG } from "../theme";
import { useSelector } from "react-redux";
import { ReduxType } from "./types";


const GlobalRecord: React.FC = () => {
    const globalRecord = useSelector((state: ReduxType) => state.mainInfo.globalRecord);

    const theme = useTheme()
    const isDarkTheme = theme.palette.mode === "dark"

    return (
        <Button
            sx={{
                width: '20%', border: 1, fontWeight: 'bold',
                borderRadius: "10px", padding: -1, fontSize: "large", paddingY: "8px", lineHeight: 'inherit',
                backgroundColor: `${isDarkTheme ? darkSecondaryColor : lightSecondaryBG}`
            }} disabled>
            <EmojiEventsOutlinedIcon sx={{ color: lightSVGicon, opacity: 0.5, marginRight: 1, }} />
            {globalRecord}
        </Button>
    )
}

export default GlobalRecord