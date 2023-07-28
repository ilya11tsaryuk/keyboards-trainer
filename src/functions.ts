export const fetchResult = (record: number) => {
    try {
        const recordJSON = JSON.stringify(record);
        localStorage.setItem('typingRecord', recordJSON);
    } catch (error) {
        console.error('Ошибка при сохранении рекорда в локальное хранилище:', error);
    }
};

export const getRecord = () => {
    try {
        const recordJSON = localStorage.getItem('typingRecord');
        return recordJSON ? JSON.parse(recordJSON) : 0;
    } catch (error) {
        console.error('Ошибка при получении рекорда из локального хранилища:', error);
        return null;
    }
};

export const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

//  export const startTimer = (timer: string) => {
//     const [minutes, seconds] = timer.split(":").map((time) => parseInt(time));
//     let totalSeconds = minutes * 60 + seconds;
//     totalSeconds++;

//     const newMinutes = Math.floor(totalSeconds / 60);
//     const newSeconds = totalSeconds % 60;
//     const formattedTime = `${formatTime(newMinutes)}:${formatTime(newSeconds)}`;

//     dispatch(setTimer(formattedTime));
//   };