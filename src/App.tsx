import React, { useEffect, useState } from 'react';
import KeyBoard from './Components/KeyBoard';
import { Box, Button, IconButton, ThemeProvider, Switch, useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ScreenLaptop from './Components/ScreenLaptop';
import MySelect from './Components/MySelect';
import { LANGUAGE, LEVEL, LIST_BUTTONS, LIST_BUTTONS_PRESS_SHIFT, fetchResult, getRecord } from './constants';
import { useDispatch } from 'react-redux';
import { removeLetter, setKeyName } from './Redux/keyNameSlice';
import ModalResult from './Components/ModalResult';
import TypingInfo from './Components/TypingInfo';
import { ID_DATA_BASE, SECRET_API_TOKEN } from "./constants";
import Airtable from 'airtable'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { darkBackgroundColor, darkTheme, lightBackgroundColor, lightTheme } from './theme';
import { Global, css } from '@emotion/react';
import GlobalRecord from './Components/GlobalRecord';
import { setCpm, setTimer, setAccuracy, setError } from './Redux/typingSlice';
import { useSelector } from 'react-redux';
import { ReduxType } from './Components/types';
import { setTheme } from './Redux/mainInfo';


type ObjectTypeText = {
  id: number,
  level: number
  language: string,
  value: string
}



function App() {
  // const [theme, setTheme] = useState<typeof lightTheme>(darkTheme)
  const [language, setLanguage] = useState<string>('Javascript')
  const [level, setLevel] = useState<string>('1')
  const [globalRecord, setGlobalRecord] = useState<string>("");
  const [globalRecordID, setGlobalRecordId] = useState<string>("");

  const themeColor = useSelector((state: ReduxType) => state.mainInfo.theme);
  const currentTheme = themeColor === 'dark' ? darkTheme : lightTheme

  console.log(themeColor)
  const [TEXTS, setTEXTS] = useState<ObjectTypeText[]>([])
  const [taskText, setTaskText] = useState<string>("")
  const [text, setText] = useState<string>('')
  const [indexCurrentLiter, setIndexCurrentLiter] = useState<number>(0);
  const [activeLiter, setActiveLiter] = useState<string>("");
  const [buttonList, setButtonList] = useState(LIST_BUTTONS);
  const [startTime, setStartTime] = useState<number>(0);
  const [finishTime, setFinishTime] = useState<number>(0);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const record = getRecord()

  const cpm = useSelector((state: ReduxType) => state.typing.cpm);
  const timer = useSelector((state: ReduxType) => state.typing.timer);
  const error = useSelector((state: ReduxType) => state.typing.error);
  const accuracy = useSelector((state: ReduxType) => state.typing.accuracy);
  

  // theme /////////////////////////
  const changeTheme = () => {
    const newTheme = themeColor === 'dark' ? "light" : "dark"
    dispatch(setTheme(newTheme))
  }
  const globalStyles = css`
  body {
    background-color: ${themeColor === 'dark' ? darkBackgroundColor : lightBackgroundColor};
  }
`;
/////////////////////////

  const dispatch = useDispatch();

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
      // console.log("updated start time");
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

  // console.log('cpm', cpm)

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
      // console.log('Запись успешно обновлена в Airtable.');
    } catch (error) {
      // console.error('Ошибка при обновлении записи в Airtable:', error);
    }
    setGlobalRecord(`${cpm}`)
  };


  // функция проверки результатов и если результат лучше чем есть в сторе то вызвать отправку нового результата
  const checkResult = () => {
    if (accuracy > 95 && record < cpm) {
      const newRecord = cpm
      // console.log(newRecord, "newRecord")
      // console.log(cpm, "cpm")
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
    // setCpm(speedValue);
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

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

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
            setGlobalRecord(`${record}`)
            setGlobalRecordId(recordId)
          }
        }
      });
  };
  // console.log(globalRecordID)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Получаем тексты с сервера с помощью async/await
        const texts = await getAllTexts() as ObjectTypeText[]
        // Устанавливаем полученные тексты в состояние
        await setTEXTS(texts);
        // console.log(texts, "texts")
      } catch (error) {
        console.error('Ошибка при получении текстов:', error);
      }
      finally {
        setIsLoading(false); // Выполняется всегда, независимо от успешности запроса
      }
    };

    fetchData();
    getGlobalRecord()

  }, [language, level]);

  // console.log(isLoading, 'is loading')

  useEffect(() => {
    randomText()

    // console.log(TEXTS, "Texts ")
  }, [TEXTS])


  // добавить запрос к бд и после только рандомно давать один текст (или сразу просить один рандомный текст)

  // можно добавить рекорд приложения и хранить его в бд, проверять как и checkResult() и отправлять новый рекорд вместо старого

  useEffect(() => {
    if (error > 0) {
      getAccuracy()
    }
  }, [error])

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

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
      // Функция для обновления текущего времени каждую секунду
      const intervalTime = setInterval(() => {
        getSpeed();
        startTimer();
      }, 1000);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(intervalTime);
    }
  }, [startTime, isFinish, timer]);

  return (
    // добавить отступы чтоб не появлялся скролл
    <ThemeProvider theme={currentTheme}>
      <Global styles={globalStyles} />

      <Box sx={{ width: "60%", margin: 'auto' }}>

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
          <GlobalRecord globalRecord={globalRecord} />
        </Box>
        {/* <Button onClick={() => setVisibleModal(true)}>open modal</Button> */}
        {/* <Button onClick={() => fetchResult(0)}>clean</Button> */}
        {/* <Button onClick={updateGlobalRecord}>update</Button> */}


        <Box sx={{ display: 'flex', gap: 1, marginY: 2, }}>
          <ScreenLaptop text={text} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={handleScreen} taskText={`${taskText}`} />
          <TypingInfo />
        </Box >

        <KeyBoard listButton={buttonList} />
        <ModalResult visibleModal={visibleModal} closeModal={closeModal} cpm={cpm} accuracy={accuracy} error={error} />
      </Box >
    </ThemeProvider>

  );
}

export default App;
