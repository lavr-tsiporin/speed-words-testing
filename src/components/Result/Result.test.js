import React from "react";

import { render } from "@testing-library/react";
import { Result } from './Result'
import userEvent from "@testing-library/user-event";

describe('component Result', () => {
  const stabStats = {
    sec: 10,
    words: 20
  }

  it('render stats sec', () => {
    const { getByText } = render(<Result stats={stabStats}/>)
    const sec = getByText(/сек/i)
    expect(sec).toHaveTextContent('10')
  })

  it('render stats words', () => {
    const { getByText } = render(<Result stats={stabStats}/>)
    const sec = getByText(/слов/i)
    expect(sec).toHaveTextContent('20')
  })

  it('render button retry', () => {
    const { getAllByRole } = render(<Result stats={stabStats}/>)
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('Попробовать снова?')
  })

  it('call retryClick when click button', () => {
    const retryClick = jest.fn()
    const {getByRole} = render(<Result stats={stabStats} onClickRetry={retryClick}/>)
    const button = getByRole('button')
    userEvent.click(button)
    expect(retryClick).toHaveBeenCalledTimes(1)
  })
})