import React, { useCallback, useState } from 'react';
import { Result } from '../Result/Result';
import { Typing } from '../Typing/Typing';
import { Welcome } from '../Welcome/Welcome';

export const Main = () => {
  const [step, setStep] = React.useState('welcome');
  const [status, setStatus] = useState('sentence')
  const [stats, setStats] = React.useState({
    words: 0,
    sec: 0,
  });

  const startGame = useCallback(() => {
    setStep('typing');
  }, []);

  const finishGame = useCallback((words, sec) => {
    setStep('result');
    setStats({
      words,
      sec,
    });
  }, []);

  const retryGame = useCallback(() => {
    setStep('welcome')
  }, [])

  const steps = {
    welcome: <Welcome onClickStart={startGame} setStatus={setStatus} status={status}/>,
    typing: <Typing onFinish={finishGame} status={status}/>,
    result: <Result stats={stats} onClickRetry={retryGame}/>,
  };

  return (
    <>
      <div className="common-rect">{steps[step]}</div>
    </>
  );
};