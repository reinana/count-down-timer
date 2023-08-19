import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, TextField, Typography } from '@mui/material';

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [calcTime, setCalcTime] = useState(new Date(0,0,0,0,0,0));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalID = 0; // setIntervalの戻り値 0でない整数
    console.log(calcTime.getTime())
    // タイマーが動いている isRunning = true
    if (isRunning) {
      intervalID = window.setInterval(() => {
        if(calcTime.getTime() === -2209107600000) {
          setIsRunning(false)
          return;
        }
        setCalcTime((prev) => new Date(prev.getTime() - 1000))
      }, 1000)
    } 

    return () => window.clearInterval(intervalID)
  }, [isRunning, calcTime]);

  useEffect(() => {
    const hh = String(calcTime.getHours()).padStart(2,'0')
    const mm = String(calcTime.getMinutes()).padStart(2,'0')
    const ss = String(calcTime.getSeconds()).padStart(2,'0')

    setTime(`${hh}:${mm}:${ss}`)

  },[calcTime])

  const start = () => {
    if(hour === 0 && minute === 0 && second === 0) return;
    setCalcTime(new Date(0,0,0,hour,minute,second))
    setIsRunning(true);
  };
  const pause = () => {
    setIsRunning(false);
  }
  const restart = () => {
    setIsRunning(true)
  }
  const reset = () => {

    setIsRunning(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTime("00:00:00")
  }
  // inputの数値を組み合わせてtime 00:00:00 に入れる
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.name)
    switch (e.target.name) {
      case "hour":
        console.log(e.target.value)
        setHour(parseInt(e.target.value))
        setTime(`${e.target.value.padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`)
        break;
      case "minute":
        setMinute(parseInt(e.target.value))
        setTime(`${String(hour).padStart(2, "0")}:${e.target.value.padStart(2, "0")}:${String(second).padStart(2, "0")}`)
        break;
      case "second":
        setSecond(parseInt(e.target.value))
        setTime(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${e.target.value.padStart(2, "0")}`)
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <h1>Count Down Timer</h1>
        <div className='inputbox'>

          <TextField fullWidth name='hour' sx={{ mx: 2 }} type='number' label='時間' value={hour} InputProps={{ inputProps: { min: 0, max: 24 } }} onChange={(e) => onChangeHandler(e)} />
          <TextField fullWidth name='minute' sx={{ mx: 2 }} type='number' label='分' value={minute} InputProps={{ inputProps: { min: 0, max: 59 } }} onChange={(e) => onChangeHandler(e)} />
          <TextField fullWidth name='second' sx={{ mx: 2 }} type='number' label='秒' value={second} InputProps={{ inputProps: { min: 0, max: 59 } }} onChange={(e) => onChangeHandler(e)} />
          <Button fullWidth sx={{ mx: 2 }} variant="contained" onClick={start} disabled={isRunning}>開始</Button>
        </div>
        <div className='remaining-time'>
          <Typography sx={{ fontSize: 100 }}>{time}</Typography>
        </div>
        <div className='buttons'>
          <Button variant="contained" onClick={pause} disabled={!isRunning}>一時停止</Button>
          <Button variant="contained" onClick={restart} disabled={isRunning}>再スタート</Button>
          <Button variant="contained" onClick={reset} disabled={isRunning}>リセット</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
