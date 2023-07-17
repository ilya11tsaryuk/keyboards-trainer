import React, { useEffect, useState } from 'react';
import KeyBoard from './Components/KeyBoard';
import { Box, Button, Modal, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ScreenLaptop from './Components/ScreenLaptop';
import MySelect from './Components/MySelect';
import { LANGUAGE, LEVEL, LIST_BUTTONS, LIST_BUTTONS_PRESS_SHIFT, TEXTS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeLetter, setKeyName } from './Redux/keyNameSlice';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ModalResult from './Components/ModalResult';
import TypingInfo from './Components/TypingInfo';

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
  const [startTime, setStartTime] = useState<number>(0);
  const [finishTime, setFinishTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timer, setTimer] = useState<string>("00:00");
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

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

  const isLastLiter = () => {
    return text.length === taskText.length ? true : false
  }

  const isFinish = isLastLiter()

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(removeLetter())
    const keyName = event.key;
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS);
    }
    if (isFinish) {
      setFinishTime((Date.now() - startTime))
      // добавить остановку время для подсчета рузультатов
      setVisibleModal(true)
      // запускать функцию проверки результатов
      checkResult()
    }
  };



  const getRecord = () => {
    try {
      const recordJSON = localStorage.getItem('typingRecord');
      return recordJSON ? JSON.parse(recordJSON) : 0;
    } catch (error) {
      console.error('Ошибка при получении рекорда из локального хранилища:', error);
      return null;
    }
  };

  const record = getRecord()

  // функция отправки результата
  const fetchResult = (record: number) => {
    try {
      const recordJSON = JSON.stringify(record);
      localStorage.setItem('typingRecord', recordJSON);
    } catch (error) {
      console.error('Ошибка при сохранении рекорда в локальное хранилище:', error);
    }
  };

  // функция проверки результатов и если результат лучше чем есть в сторе то вызвать отправку нового результата
  const checkResult = () => {
    if (accuracy > 95 && record < cpm) {
      const newRecord = cpm
      console.log(newRecord, "newRecord")
      console.log(cpm, "cpm")
      fetchResult(newRecord)
    }
  }


  const handleScreen = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (activeLiter === "Enter" && taskText[indexCurrentLiter] === "\n") {
      let indexLiter = indexCurrentLiter + 1
      let tab = ""
      let counter = 1
      while (taskText[indexLiter] === "\t") {
        tab += "\t"
        indexLiter++
        counter++
      }
      setText((prevText) => prevText + `\n${tab}`);
      setIndexCurrentLiter((prev) => prev + counter);
    } else {
      if (activeLiter === taskText[indexCurrentLiter]) {
        setText(event.target.value)
        setIndexCurrentLiter((prev) => prev + 1)
      }
      if (activeLiter !== taskText[indexCurrentLiter]) {
        setError((prev) => prev + 1)
      }
    }
  }

  const getAccuracy = () => {
    const newAccuracy = Math.floor(100 - (error / taskText.length * 100))
    setAccuracy(newAccuracy)
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getCuurentTime = () => {
    const timeInSeconds = (Date.now() - startTime) / 1000;
    setTimer(formatTime(timeInSeconds));
    setCurrentTime(timeInSeconds)
  };

  const getSpeed = () => {
    const lettersCount = text.length;
    console.log(lettersCount, "leters count")
    const speedValue = Math.floor((lettersCount / currentTime) * 60);
    setCpm(speedValue);
  };

  const restart = () => {
    setActiveLiter("")
    setIndexCurrentLiter(0)
    setStartTime(0)
    setAccuracy(100)
    setCpm(0)
    setError(0)
    setText("")
    randomText()
  }

  const closeModal = () => {
    restart()
    setVisibleModal(false)
  }

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const randomText = () => {
    const matchingTexts = TEXTS.filter(text => text.language === language && text.level === level);
    const randomIndex = Math.floor(Math.random() * matchingTexts.length);
    const randomText = matchingTexts[randomIndex];
    setTaskText(randomText ? randomText.value : 'Произошла ошибка');
  }

  useEffect(() => {
    randomText()
  }, [language, level]);

  useEffect(() => {
    if (error > 0) {
      getAccuracy()
    }
  }, [error])

  useEffect(() => {
    if (startTime > 0) {
      // Функция для обновления текущего времени каждую секунду
      const intervalTime = setInterval(() => {
        getCuurentTime();
        getSpeed()
      }, 1000);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(intervalTime);
    }
  }, [startTime, currentTime]);


  return (
    <Box sx={{ width: "60%", margin: 'auto' }}>
      <MySelect defaultValue={language} menuItems={LANGUAGE} styles={{ width: '20%' }} handleChange={handleChangeLanguage} />
      <MySelect defaultValue={level} menuItems={LEVEL} styles={{ width: '10%', textAlign: 'center' }} handleChange={handleChangeLevel} />
      <Button onClick={restart}>restart</Button>
      <Button onClick={() => setVisibleModal(true)}>open modal</Button>
      <Button onClick={() => fetchResult(0)}>clean</Button>
      <Typography>{timer}</Typography>
      <ModalResult visibleModal={visibleModal} closeModal={closeModal} cpm={cpm} accuracy={accuracy} error={error} />
      <Box sx={{ display: 'flex' }}>
        <ScreenLaptop text={text} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={handleScreen} taskText={`${taskText}`} />
        <TypingInfo record={record} cpm={cpm} accuracy={accuracy} error={error} />
      </Box >
      <KeyBoard listButton={buttonList} />
    </Box >
  );
}

export default App;
