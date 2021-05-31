import React, { Component } from 'react'

class Gameboard extends Component {
  getClassName = cell => {
    switch (cell) {
      case ' ':
        return 'unrevealed'
      case 'F':
        return 'flagged'
      case '*':
        return 'bomb'
      case '_':
        return 'revealed'
      case '1':
        return 'revealed'
      case '2':
        return 'revealed'
      case '3':
        return 'revealed'
      case '4':
        return 'revealed'
      case '5':
        return 'revealed'
    }
  }
  render() {
    return (
      <div>
        {this.props.brick.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((cell, columnIndex) => {
                return (
                  <li
                    className="cell"
                    key={columnIndex}
                    // @ts-ignore
                    onClick={() => this.props.funClick(rowIndex, columnIndex)}
                    onContextMenu={() =>
                      this.props.Clickish(rowIndex, columnIndex)
                    }
                  >
                    {cell}
                  </li>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gameboard
