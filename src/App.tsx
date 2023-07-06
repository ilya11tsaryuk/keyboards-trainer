import React, { useEffect, useState } from 'react';
import KeyBoard from './Components/KeyBoard';
import { Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ScreenLaptop from './Components/ScreenLaptop';
import MySelect from './Components/MySelect';
import { LANGUAGE, LEVEL, LIST_BUTTONS, TEXTS } from './constants';
import { useDispatch } from 'react-redux';
import { removeLetter, setKeyName } from './Redux/keyNameSlice';

function App() {
  const [currentText, setCurrentText] = useState<string>('')
  const [cpm, setCpm] = useState(0);
  const [startTime, setStartTime] = useState<null | number>(null);
  const [language, setLanguage] = useState<string>('JavaScript')
  const [level, setLevel] = useState<string>('1')

  const dispatch = useDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyName = event.key;
    dispatch(setKeyName(keyName))
    console.log("Нажата клавиша:", keyName);
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(removeLetter())
  };

  const handleScreen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value)
    getSpeed()
  }

  const getSpeed = () => {
    const startTime = Date.now()
    const currentTime: number = (Date.now() - startTime) / 1000
    const lettersCount = currentText.length
    const speedValue = lettersCount / currentTime
    setCpm(speedValue)
  }

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    // непонятно обновляется language
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    // непонятно обновляется level
  };
  // console.log(language)
  useEffect(() => {
    console.log('useEffect')
    const newText = TEXTS.find(text => text.language === language && text.level === level);
    setCurrentText(newText ? newText.value : 'Произошла ошибка')
  }, [language, level])

  return (
    <Box sx={{ width: "60%", margin: 'auto' }}>
      <MySelect defaultValue={language} menuItems={LANGUAGE} styles={{ width: '20%' }} handleChange={handleChangeLanguage} />
      <MySelect defaultValue={level} menuItems={LEVEL} styles={{ width: '10%', textAlign: 'center' }} handleChange={handleChangeLevel} />
      <Box sx={{ display: 'flex' }}>
        <ScreenLaptop onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={handleScreen} currentText={`${currentText}`} />
        <Box sx={{
          width: '20%', border: 1, borderRadius: 1, display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between', padding: 1, paddingY: 2
        }}>
          <Typography sx={{ opacity: 0.5 }}>{`record`}</Typography>
          <Typography>{`771 s/m`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`${cpm}`}</Typography>
          <Typography>{`257 s/m`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`error`}</Typography>
          <Typography>{`3`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`accuracy`}</Typography>
          <Typography>{`99,8%`}</Typography>
        </Box>
      </Box>
      <KeyBoard listButton={LIST_BUTTONS} />
    </Box>
  );
}

export default App;
