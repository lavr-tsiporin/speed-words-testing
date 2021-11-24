import React from "react";
import axios from "axios";

import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Typing } from '../components/Typing/Typing';

jest.mock("axios");

describe('Component Typing', () => {
  let mockedAxiosFetch;
  const finishGame = jest.fn()
  const fakeResponse = {
    data: [{
      words: ["word-test"]
    }]
  };
  const timer = {
    finish: 20000,
    tick: 1000
  }

  describe('fetch successful', () => {
    beforeEach(async () => {
      jest.useFakeTimers();
      mockedAxiosFetch = await axios.get.mockImplementationOnce(() => Promise.resolve(fakeResponse));
      await waitFor(() => render(<Typing status="words" onFinish={finishGame}/>));
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('fake fetch data and call one fetch', () => {
      expect(mockedAxiosFetch).toHaveBeenCalledTimes(1)
    });

    it('fake fetch data and fake response visible in component', () => {
      expect(screen.getByText("word-test").textContent).toBe("word-test")
    });

    it('fake word and user event change input value successful', () => {
      const inputHtml = screen.getByRole('textbox')
      userEvent.type(inputHtml, "test")
      expect(inputHtml).toHaveClass('error')
    });

    it('fake word and user event change input value error', () => {
      const inputHtml = screen.getByRole('textbox')
      userEvent.type(inputHtml, "test")
      userEvent.clear(inputHtml)
      userEvent.type(inputHtml, "word")
      expect(inputHtml).not.toHaveClass("error")
    });

    it('focus input after start game', () => {
      const inputHtml = screen.getByRole('textbox')
      expect(inputHtml).toHaveFocus()
    });

    it('start timer after start game', async () => {
      const timerHtml = screen.getByText(/сек/i);
      await waitFor(() => jest.advanceTimersByTime(timer.tick));
      expect(timerHtml).toHaveTextContent('19')
    });

    it('finish timer and game over', async () => {
      await waitFor(() => jest.advanceTimersByTime(timer.finish));
      expect(finishGame).toBeCalledTimes(1)
    });
  })

  describe('fetch error', () => {
    it('fetch error and visible spinner loading', () => {
      axios.get.mockImplementationOnce(() => Promise.reject('spin and error'));
      render(<Typing status="words"/>);
      expect(document.querySelector(".loading-spinner-bean-eater")).toBeInTheDocument();
    });
  })


})
