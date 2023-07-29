import React, { useEffect, useState } from 'react';
import { ThemeProvider, Box, Typography } from '@mui/material';
import { LIST_BUTTONS, LIST_BUTTONS_PRESS_SHIFT } from './constants';
import { useDispatch } from 'react-redux';
import { removeLetter, setKeyName } from './Redux/keyNameSlice';
import { ID_DATA_BASE, SECRET_API_TOKEN } from "./constants";
import Airtable from 'airtable'
import { darkBackgroundColor, darkTheme, lightBackgroundColor, lightTheme } from './theme';
import { Global, css } from '@emotion/react';
import { setCpm, setTimer, setAccuracy, setError, } from './Redux/typingSlice';
import { useSelector } from 'react-redux';
import { ReduxType } from './Components/types';
import { setGlobalRecord, setGlobalRecordID } from './Redux/mainInfo';
import { fetchResult, formatTime, getRecord } from './functions';
import Container from './Components/Container';
import { isMobile } from 'react-device-detect';

type ObjectTypeText = {
  id: number,
  level: number
  language: string,
  value: string
}

function App() {

  const [TEXTS, setTEXTS] = useState<ObjectTypeText[]>([])
  const [taskText, setTaskText] = useState<string>("")
  const [text, setText] = useState<string>('')
  const [indexCurrentLiter, setIndexCurrentLiter] = useState<number>(0);
  const [activeLiter, setActiveLiter] = useState<string>("");
  const [buttonList, setButtonList] = useState(LIST_BUTTONS);
  const [startTime, setStartTime] = useState<number>(0);
  const [finishTime, setFinishTime] = useState<number>(0);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const language = useSelector((state: ReduxType) => state.mainInfo.language);
  const level = useSelector((state: ReduxType) => state.mainInfo.level);
  const globalRecord = useSelector((state: ReduxType) => state.mainInfo.globalRecord);
  const globalRecordID = useSelector((state: ReduxType) => state.mainInfo.globalRecordID);
  const record = getRecord()
  const cpm = useSelector((state: ReduxType) => state.typing.cpm);
  const timer = useSelector((state: ReduxType) => state.typing.timer);
  const error = useSelector((state: ReduxType) => state.typing.error);
  const accuracy = useSelector((state: ReduxType) => state.typing.accuracy);

  // получаем цвет темы со стора и определяем глобальную тему
  const themeColor = useSelector((state: ReduxType) => state.mainInfo.theme);
  const currentTheme = themeColor === 'dark' ? darkTheme : lightTheme
  const globalStyles = css`
  body {
    background-color: ${themeColor === 'dark' ? darkBackgroundColor : lightBackgroundColor};
  }`;
  
  const base = new Airtable({ apiKey: SECRET_API_TOKEN }).base(ID_DATA_BASE);
  const filterTexts = `AND(level = "${level}", language = "${language}")`;

  const getAllTexts = async () => {
    return new Promise((resolve, reject) => {
      base('tasks').select({
        filterByFormula: filterTexts,
      }).eachPage(function page(records, fetchNextPage) {
        const newText: any = [];
        records.forEach(record => newText.push(record?.fields));

        // Вызываем resolve, чтобы передать результат (newText) обратно после завершения запроса
        resolve(newText);
        // console.log(newText, 'in promise')
      }, function done(err) {
        if (err) {
          // Вызываем reject, если произошла ошибка
          reject(err);
        }
      });
    });
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyName = event.key;
    dispatch(setKeyName(keyName))
    setActiveLiter(keyName)
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS_PRESS_SHIFT);
    }
    if (startTime === 0) {
      setStartTime(Date.now());
    }
  };

  const isLastLiter = () => {
    return text.length === taskText.length ? true : false
  }
  const isFinish = isLastLiter()

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    dispatch(removeLetter())
    const keyName = event.key;
    if (keyName === 'Shift') {
      setButtonList(LIST_BUTTONS);
    }
    if (isFinish) {
      setFinishTime((Date.now() - startTime))
      setVisibleModal(true)
      checkResult()
    }
  };

  const updateGlobalRecord = async () => {
    const newRecord = {
      language: language,
      record: cpm
    }
    try {
      await base("record").update([
        {
          id: globalRecordID,
          fields: newRecord,
        },
      ]);
    } catch (error) {
      console.error('Ошибка при обновлении записи в Airtable:', error);
    }
    dispatch(setGlobalRecord(`${cpm}`))
  };
  // функция проверки результатов и если результат лучше чем есть в сторе то вызвать отправку нового результата
  const checkResult = () => {
    if (accuracy > 95 && record < cpm) {
      const newRecord = cpm
      fetchResult(newRecord)
    }
    if (accuracy > 95 && Number(globalRecord) < cpm) {
      updateGlobalRecord()
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
        dispatch(setError(error + 1))
      }
    }
  }

  const getAccuracy = () => {
    const newAccuracy = Math.floor(100 - (error / taskText.length * 100))
    dispatch(setAccuracy(newAccuracy))
  }

  const getSpeed = () => {
    const currentTime = (Date.now() - startTime) / 1000
    const lettersCount = text.length;
    const speedValue = Math.floor((lettersCount / currentTime) * 60);
    dispatch(setCpm(speedValue))
  };

  const restart = () => {
    setActiveLiter("")
    setIndexCurrentLiter(0)
    setStartTime(0)
    dispatch(setAccuracy(100))
    dispatch(setCpm(0))
    dispatch(setError(0))
    setText("")
    dispatch(setTimer("00:00"))
    randomText()
  }
  const closeModal = () => {
    restart()
    setVisibleModal(false)
  }

  const randomText = () => {
    if (TEXTS.length > 0) {
      const randomIndex = Math.floor(Math.random() * TEXTS.length);
      const randomText = TEXTS[randomIndex].value;
      // console.log(randomText, 'random')
      // add replace \n \t 
      const decodedValue = randomText.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      setTaskText(decodedValue ? decodedValue : 'Произошла ошибка');
    }
  };
  // const filterRecord = `(language = "${language}")`;

  const getGlobalRecord = () => {
    base('record')
      .select({
        filterByFormula: `{language} = "${language}"`,
        maxRecords: 1, // Указываем, что хотим получить только одну запись
      })
      .firstPage(function (err, records) {
        if (err) {
          // console.log('Error:', err);
        } else {
          if (records && records.length > 0) {
            const recordId = records[0].id
            const record = records[0].fields.record
            dispatch(setGlobalRecord(`${record}`))
            dispatch(setGlobalRecordID(recordId))
          }
        }
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const texts = await getAllTexts() as ObjectTypeText[]
        await setTEXTS(texts);
        // console.log(texts, "texts")
      } catch (error) {
        console.error('Ошибка при получении текстов:', error);
      }
    };

    fetchData();
    getGlobalRecord()
  }, [language, level]);

  useEffect(() => {
    randomText()
  }, [TEXTS])

  useEffect(() => {
    if (error > 0) {
      getAccuracy()
    }
  }, [error])

  const startTimer = () => {
    const [minutes, seconds] = timer.split(":").map((time) => parseInt(time));
    let totalSeconds = minutes * 60 + seconds;
    totalSeconds++;

    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    const formattedTime = `${formatTime(newMinutes)}:${formatTime(newSeconds)}`;
    dispatch(setTimer(formattedTime));
  };


  useEffect(() => {
    if (startTime > 0 && !isFinish) {
      // обновлениe текущего времени каждую секунду
      const intervalTime = setInterval(() => {
        getSpeed();
        startTimer();
      }, 1000);
      // Очистка интервала при размонтировании компонента
      return () => clearInterval(intervalTime);
    }
  }, [startTime, isFinish, timer]);

  if (isMobile) return <Box sx={{height: '100vh', display: 'flex'}}><Typography sx={{margin: 'auto'}}>This application for  laptop</Typography></Box>

  return (
    <ThemeProvider theme={currentTheme}>
      <Global styles={globalStyles} />
      <Container
        text={text}
        handleKeyUp={handleKeyUp}
        handleKeyDown={handleKeyDown}
        handleScreen={handleScreen}
        taskText={taskText}
        buttonList={buttonList}
        restart={restart}
        visibleModal={visibleModal}
        closeModal={closeModal} />
    </ThemeProvider>

  );
}

export default App;
