import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  }
  handleNewGame = async () => {
    const response = await fetch('https://minesweeper-api.herokuapp.com/game', {
      method: 'POST',
    })
    if (response.status === 201) {
      const game = await response.json()
      console.log(game)
      this.setState(game)
    }
  }
  //right click is ontextmenu
  handleCellClick = async (row, col) => {
    const body = { row: row, col: col }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (response.status === 200) {
      const game = await response.json()
      this.setState(game)
    }
  }

  render() {
    return (
      <>
        <h1>Barefoot Lego Detector</h1>
        <button onClick={() => this.handleNewGame}>New Game</button>
        <div>
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="row">
                {row.map((cell, columnIndex) => {
                  return (
                    <div
                      className="cell"
                      // @ts-ignore
                      onClick={() =>
                        this.handleCellClick(rowIndex, columnIndex)
                      }
                    ></div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
