import React, { Component } from 'react'
import Gameboard from './components/Gameboard'

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

  //New Game
  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.status === 200) {
      const game = await response.json()
      console.log(game)
      this.setState(game)
    }
  }

  //Check cell
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

  //Flag cell
  handleFlagCell = async (row, col) => {
    const body = { row: row, col: col }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
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
        <h1>Lego-Sweeper</h1>

        <button onClick={this.handleNewGame}>New Game</button>
        <Gameboard
          brick={this.state.board}
          funClick={this.handleCellClick}
          Clickish={this.handleFlagCell}
        />
      </>
    )
  }
}

//right click is ontextmenu
//<h2>Sweep up the bricks before you step on one!</h2>
