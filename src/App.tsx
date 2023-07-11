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
    getSpeed()
    const keyName = event.key;
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS);
    }
    if (isFinish) {
      // добавить остановку время для подсчета рузультатов
      setVisibleModal(true)

      // запускать функцию проверки результатов
      // checkResult()
    }
  };

  // функция проверки результатов и если результат лучше чем есть в сторе то вызвать отправку нового результата
  const checkResult = () => {
    //  if (record.accurancy > 95 & record.speed > cpm) {
    // fetchResult()
  }


  // функция отправки результата
  const fetchResult = () => {
    // bla bla bla send result
  }

  //const getRecord = () => {
  //    
  //  }


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
  // console.log("следующий символ", taskText[indexCurrentLiter + 1])
  // console.log("indexCurrentLiter", indexCurrentLiter)
  // console.log("19", taskText[21])

  const getAccuracy = () => {
    const newAccuracy = Math.floor(100 - (error / taskText.length * 100))
    setAccuracy(newAccuracy)
  }

  const getSpeed = () => {
    if (startTime > 0) {
      const currentTime = (Date.now() - startTime) / 1000;
      const lettersCount = taskText.length;
      const speedValue = Math.floor((lettersCount / currentTime) * 60);
      setCpm(speedValue);
    }
  };
  console.log(taskText.length)
  console.log("индекс следующей буквы", indexCurrentLiter)

  const restart = () => {
    setActiveLiter("")
    setIndexCurrentLiter(0)
    setStartTime(0)
    setAccuracy(100)
    setCpm(0)
    setError(0)
    setText("")
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
      <Button onClick={restart}>restart</Button>
      <Box sx={{ display: 'flex' }}>
        <Modal open={visibleModal} onClose={closeModal}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h5" gutterBottom>
              Твои результаты
            </Typography>
            <Typography variant="body1" gutterBottom>
              Скорость: {`${cpm} s/m`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Точность: {`${accuracy}%`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Количество ошибок: {error}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button onClick={closeModal} variant='outlined'>
                Начать заново
              </Button>
            </Box>
          </Box>
        </Modal>

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
      </Box >
      <KeyBoard listButton={buttonList} />
    </Box >
  );
}

export default App;
