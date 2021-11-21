import React from 'react';

export const Result = ({ stats, onClickRetry }) => {
  return (
    <div className="flex result">
      <div className="result__top-icon">😓</div>
      <p className="result__phrase">
        Неплохо! За <b>{stats.sec} секунд</b>, ты ввел:
      </p>
      <div className="result__number-of-words">{stats.words} слова</div>
      <button className="button" onClick={onClickRetry}>🤔 Попробовать снова?</button>
    </div>
  );
};
