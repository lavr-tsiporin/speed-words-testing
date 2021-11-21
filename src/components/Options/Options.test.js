import React from "react";

import { render, screen } from "@testing-library/react";
import { Options } from './Options'
import userEvent from "@testing-library/user-event";

describe('components <Options/>', () => {
  describe('render UI component', () => {
    beforeEach(() => {
      render(<Options/>)
    })

    it('render component with two inputs', () => {
      const inputs = screen.getAllByRole('radio')
      expect(inputs).toHaveLength(2)
    })

    it('render first variant game', () => {
      expect(screen.getByText(/Предложения/i)).toBeInTheDocument()
    })

    it('render second variant game', () => {
      expect(screen.getByText(/Слова/i)).toBeInTheDocument()
    })
  })

  describe('logic radio button', () => {
    describe('check first radio element and not check second radio element', () => {
      beforeEach(() => {
        const userClick = jest.fn()
        render(<Options setStatus={userClick}/>)
      })

      it('check first radio element', () => {
        const sentenceRadio = screen.getByLabelText(/Предложения/i)
        expect(sentenceRadio).toBeChecked()
      })
      it('not check second radio element', () => {
        const wordsRadio = screen.getByLabelText(/Слова/i)
        expect(wordsRadio).not.toBeChecked()
      })

      it('user click for second radio element', () => {
        const sentenceRadio = screen.getByLabelText(/Предложения/i)
        const wordsRadio = screen.getByLabelText(/Слова/i)
        userEvent.click(wordsRadio)
        expect(sentenceRadio).not.toBeChecked()
        expect(wordsRadio).toBeChecked()
      })

      it('user click for first radio element after checked second radio element', () => {
        const sentenceRadio = screen.getByLabelText(/Предложения/i)
        const wordsRadio = screen.getByLabelText(/Слова/i)
        userEvent.click(wordsRadio)
        userEvent.click(sentenceRadio)
        expect(sentenceRadio).toBeChecked()
        expect(wordsRadio).not.toBeChecked()
      })
    })
  })
})