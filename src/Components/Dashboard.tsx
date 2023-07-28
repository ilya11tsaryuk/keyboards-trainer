import React from "react";
import { Box, Switch, IconButton } from "@mui/material"
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import MySelect from "./MySelect";
import GlobalRecord from "./GlobalRecord";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent } from '@mui/material/Select';
import { ReduxType } from "./types";
import { setLanguage, setLevel, setTheme } from "../Redux/mainInfo";
import { LANGUAGE, LEVEL } from "../constants";

type DashboardProps = {
    restart: () => void
}
// <DashboardProps>
const Dashboard: React.FC<DashboardProps> = ({restart}) => {

    const themeColor = useSelector((state: ReduxType) => state.mainInfo.theme);
    const language = useSelector((state: ReduxType) => state.mainInfo.language);
    const level = useSelector((state: ReduxType) => state.mainInfo.level);
    const dispatch = useDispatch()

    const changeTheme = () => {
        const newTheme = themeColor === 'dark' ? "light" : "dark"
        dispatch(setTheme(newTheme))
    }

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        dispatch(setLanguage(event.target.value as string));
    };

    const handleChangeLevel = (event: SelectChangeEvent) => {
        dispatch(setLevel(event.target.value as string));
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 3, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Switch checked={themeColor === 'dark' ? true : false} onChange={changeTheme} />
                <MySelect defaultValue={language} menuItems={LANGUAGE}
                    styles={{ width: '20%', borderRadius: 5, }}
                    handleChange={handleChangeLanguage} />
                <MySelect defaultValue={level} menuItems={LEVEL}
                    styles={{ width: '10%', textAlign: 'center', borderRadius: 5 }}
                    handleChange={handleChangeLevel} />
                <IconButton onClick={restart}><RestartAltOutlinedIcon /></IconButton>
            </Box>
            <GlobalRecord />
        </Box>
    )
}

export default Dashboard