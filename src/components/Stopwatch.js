import React, { useEffect, useState } from "react";

let interval;
const Stopwatch = () => {
  const initialTimer = "00 : 00 : 00 : 00";
  const initialTiming = { hour: 0, min: 0, sec: 0, ms: 0 };
  const [timerStarted, setTimerStarted] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(initialTimer);
  const [timings, setTimings] = useState(initialTiming);
  const [stop, setStop] = useState(false);
  const [timer, setTimer] = useState(false);
  const checkVal = (val) => (val < 10 ? `0${val}` : val);

  const formatTimeString = ({ hour, min, sec, ms }) => {
    const str = `${checkVal(hour)} : ${checkVal(min)} : ${checkVal(
      sec
    )} : ${checkVal(ms)}`;
    setDisplayTimer(str);
  };

  const calculateElaspsedTime = () => {
    let { hour, min, sec, ms } = timings;
    interval = setInterval(() => {
      ms++;
      if (ms === 100) {
        sec++;
        ms = 0;
      }
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (min === 60) {
        hour++;
        min = 0;
        sec = 0;
      }
      setTimings({ hour, min, sec, ms });
      formatTimeString({ hour, min, sec, ms });
    }, 10);
  };

  useEffect(() => {
    if (timerStarted) calculateElaspsedTime();
    else clearInterval(interval);
  }, [timerStarted]);

  const handleStartPause = (type) => {
    type === "Start" && setTimer(true);
    setStop(false);
    setTimerStarted(!timerStarted);
  };

  const handleReset = () => {
    setDisplayTimer(initialTimer);
    setTimings(initialTiming);
    setStop(false);
    setTimer(false);
  };

  const handleStop = () => {
    setStop(true);
    clearInterval(interval);
    setTimerStarted(false);
  };

  const buttonLabel = timerStarted ? "Pause" : "Start";
  return (
    <div className="main">
      <h1>Stopwatch</h1>
      <h2>{displayTimer}</h2>
      <div>
        <button onClick={() => handleStartPause(buttonLabel)}>
          {buttonLabel}
        </button>
        {timer && <button onClick={handleStop}>Stop</button>}
        {stop && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
};

export default Stopwatch;
