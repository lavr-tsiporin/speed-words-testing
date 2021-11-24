import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Welcome } from "../components/Welcome/Welcome";

describe('component Welcome', () => {
  describe('Game name', () => {
    beforeEach(() => {
      render(<Welcome/>)
    })
    it('render game name in component Welcome', () => {
      expect(screen.getByText(/speed words/i)).toBeInTheDocument();
    })

    it('render game description in component Welcome', () => {
      expect(screen.getByText(/Игра на скорость ввода слов/i)).toBeInTheDocument();
    })
  })

  describe('component Options in component Welcome', () => {
    beforeEach(() => {
      render(<Welcome/>)
    })
    it('render Options component', () => {
      const OptionsComponent = screen.getByLabelText(/Предложения/i).closest('div')
      expect(OptionsComponent).toHaveClass('options_container')
    })

    it('render component Options with two radio elements', () => {
      const inputs = screen.getAllByRole('radio')
      expect(inputs).toHaveLength(2)
    })
  })

  describe('render button in component Welcome', () => {
    it('render component with one button', () => {
      const { getAllByRole } = render(<Welcome/>)
      const buttons = getAllByRole('button')
      expect(buttons).toHaveLength(1)
    })

    it('render button name in component Welcome', () => {
      const { getByText } = render(<Welcome/>)
      expect(getByText(/Начать/i)).toBeInTheDocument();
    })

    it('call startClick when click button', () => {
      const startClick = jest.fn()
      const { getByRole } = render(<Welcome onClickStart={startClick}/>)
      const button = getByRole('button')
      userEvent.click(button)
      expect(startClick).toHaveBeenCalledTimes(1)
    })
  })
})