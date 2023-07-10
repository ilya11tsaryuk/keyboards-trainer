import React, { useEffect, useRef, useState } from 'react';
import KeyBoard from './Components/KeyBoard';
import { Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ScreenLaptop from './Components/ScreenLaptop';
import MySelect from './Components/MySelect';
import { LANGUAGE, LEVEL, LIST_BUTTONS, LIST_BUTTONS_PRESS_SHIFT, TEXTS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeLetter, setKeyName } from './Redux/keyNameSlice';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function App() {
  const [taskText, setTaskText] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [cpm, setCpm] = useState<number>(0);
  const [error, setError] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [indexCurrentLiter, setIndexCurrentLiter] = useState<number>(0);
  const [activeLiter, setActiveLiter] = useState<string>("");
  const [language, setLanguage] = useState<string>('JavaScript')
  const [level, setLevel] = useState<string>('1')
  const [buttonList, setButtonList] = useState(LIST_BUTTONS);
  const [startTime, setStartTime] = useState(0);

  const dispatch = useDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyName = event.key;
    dispatch(setKeyName(keyName))
    setActiveLiter(keyName)
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS_PRESS_SHIFT);
    }
    if (startTime === 0) {
      setStartTime(Date.now());
      console.log("updated start time");
    }
    // console.log("Нажата клавиша:", keyName);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(removeLetter())
    getSpeed()
    const keyName = event.key;
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS);
    }
  };

  const handleScreen = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (activeLiter === taskText[indexCurrentLiter]) {
      setText(event.target.value)
      setIndexCurrentLiter((prev) => prev + 1)
    }
    if (activeLiter !== taskText[indexCurrentLiter]) {
      setError((prev) => prev + 1)
    }
  }

  const getAccuracy = () => {
    const newAccuracy = Math.floor(100 - (error / taskText.length * 100))
    setAccuracy(newAccuracy)
  }

  const getSpeed = () => {
    if (startTime > 0) {
      const currentTime = (Date.now() - startTime) / 1000; // Вычисляем прошедшее время
      const lettersCount = taskText.length; // Получаем количество символов в тексте
      const speedValue = Math.floor((lettersCount / currentTime) * 60); // Вычисляем скорость в символах в минуту (CPM)
      setCpm(speedValue);
    }
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    // непонятно обновляется language
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    // непонятно обновляется level
  };

  // потом расскоментировать !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    const newText = TEXTS.find(text => text.language === language && text.level === level);
    setTaskText(newText ? newText.value : 'Произошла ошибка')
  }, [language, level])

  useEffect(() => {
    if (error > 0) {
      getAccuracy()
    }
  }, [error])

  return (
    <Box sx={{ width: "60%", margin: 'auto' }}>
      <MySelect defaultValue={language} menuItems={LANGUAGE} styles={{ width: '20%' }} handleChange={handleChangeLanguage} />
      <MySelect defaultValue={level} menuItems={LEVEL} styles={{ width: '10%', textAlign: 'center' }} handleChange={handleChangeLevel} />
      <Box sx={{ display: 'flex' }}>
        <ScreenLaptop text={text} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={handleScreen} taskText={`${taskText}`} />
        <Box sx={{
          width: '20%', border: 1, borderRadius: 1, display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between', padding: 1, paddingY: 2
        }}>
          <Typography sx={{ opacity: 0.5 }}>{`record`}</Typography>
          <Typography>{`771 s/m`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`speed`}</Typography>
          <Typography>{`${cpm} s/m`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`error`}</Typography>
          <Typography>{`${error}`}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{`accuracy`}</Typography>
          <Typography>{`${accuracy}%`}</Typography>
        </Box>
      </Box>
      <KeyBoard listButton={buttonList} />
    </Box>
  );
}

export default App;
