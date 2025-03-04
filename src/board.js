const { PUZZLE_SIZE } = require("../consts")

class Board {
  constructor (options = {}) {
    const {
      initialState,
      puzzleSize = initialState ? initialState.length : PUZZLE_SIZE
    } = options

    if (puzzleSize < 2) {
      throw new Error('Puzzle size must be at least 2')
    }

    this.puzzleSize = puzzleSize
    this.tiles = initialState || this.#generateRandomBoard()
  }

  #formatBoard(numbers) {
    return Array.from({ length: this.puzzleSize }, (_, i) => numbers.slice(i * this.puzzleSize, (i + 1) * this.puzzleSize))
  }

  #generateRandomBoard() {
    const puzzleTiles = this.puzzleSize * this.puzzleSize - 1

    const numbers = Array.from({ length: puzzleTiles }, (_, i) => i + 1)
    numbers.push(null)

    let formattedBoard

    do {
      this.#shuffle(numbers)

      formattedBoard = this.#formatBoard(numbers)
      this.tiles = formattedBoard
    } while (!this.#isSolvable(numbers) || this.isWon())

    return formattedBoard
  }

  #shuffle(numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      const copy = numbers[i]

      numbers[i] = numbers[j]
      numbers[j] = copy
    }

    return numbers
  }

  #isSolvable(numbers) {
    let inversions = 0

    const emptyTileIndex = numbers.indexOf(null)

    const filteredNumbers = numbers.filter(number => number !== null)

    for (let i = 0; i < filteredNumbers.length - 1; i++) {
      for (let j = i + 1; j < filteredNumbers.length; j++) {
        if (filteredNumbers[i] > filteredNumbers[j]) {
          inversions++
        }
      }
    }

    if (this.puzzleSize % 2 !== 0) {
      return inversions % 2 === 0
    } else {
      const emptyRowFromBottom = this.puzzleSize - Math.floor(emptyTileIndex / this.puzzleSize)

      const isEmptyRowEven = emptyRowFromBottom % 2 === 0
      const areInversionsEven = inversions % 2 === 0

      return (isEmptyRowEven && !areInversionsEven) || (!isEmptyRowEven && areInversionsEven)
    }
  }

  isWon() {
    if (!this.tiles) return false


    const numbers = this.tiles.flat()

    const lastValue = numbers.pop()

    return numbers.every((value, index) => value === index + 1) && lastValue === null
  }

  getTiles() {
    return this.tiles
  }

  #findTilePosition(value) {
    for (let i = 0; i < this.puzzleSize; i++) {
      for (let j = 0; j < this.puzzleSize; j++) {
        if (this.tiles[i][j] === value) {
          return [i, j]
        }
      }
    }
  }

  isValidMove(value) {
    if (value > this.puzzleSize * this.puzzleSize - 1) {
      return false
    }

    const [emptyRow, emptyCol] = this.#findTilePosition(null)
    const [targetRow, targetCol] = this.#findTilePosition(value)

    return (Math.abs(emptyRow - targetRow) === 1 && emptyCol === targetCol) ||
      (Math.abs(emptyCol - targetCol) === 1 && emptyRow === targetRow)
  }

  move(value) {
    if (!this.isValidMove(value)) {
      return false
    }

    const [emptyRow, emptyCol] = this.#findTilePosition(null)
    const [targetRow, targetCol] = this.#findTilePosition(value)

    this.tiles[emptyRow][emptyCol] = value
    this.tiles[targetRow][targetCol] = null

    return true
  }
}

module.exports = { Board }