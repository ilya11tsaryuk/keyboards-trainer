import React, { useEffect, useState } from 'react';
import KeyBoard from './Components/KeyBoard';
import { Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ScreenLaptop from './Components/ScreenLaptop';
import MySelect from './Components/MySelect';
import { LANGUAGE, LEVEL, LIST_BUTTONS, TEXTS } from './constants';

function App() {
  const [curentText, setCurentText] = useState<string>('')
  const [language, setLanguage] = useState<string>('JavaScript')
  const [level, setLevel] = useState<string>('1')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyName = event.key;
    console.log("Нажата клавиша:", keyName);
  };

  const handleScreent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurentText(event.target.value)
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
    setCurentText(newText ? newText.value : 'Произошла ошибка')
  }, [language, level])

  return (
    <Box sx={{ width: "60%", margin: 'auto' }}>
      <MySelect defaultValue={language} menuItems={LANGUAGE} styles={{ width: '20%' }} handleChange={handleChangeLanguage} />
      <MySelect defaultValue={level} menuItems={LEVEL} styles={{ width: '10%', textAlign: 'center' }} handleChange={handleChangeLevel} />
      <Box sx={{ display: 'flex' }}>
        <ScreenLaptop onKeyDown={handleKeyDown} onChange={handleScreent} curentText={`${curentText}`} />
        <Box sx={{
          width: '20%', border: 1, borderRadius: 1, display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between', padding: 1, paddingY: 2
        }}>
          <Typography sx={{ opacity: 0.5 }}>{`record`}</Typography>
          <Typography>{`771 s/m`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`speed`}</Typography>
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
