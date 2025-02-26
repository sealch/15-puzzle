const readline = require('readline')
const { PUZZLE_SIZE } = require('../consts')
class IOHandler {
  constructor () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  displayBoard(tiles) {
    console.clear()
    console.log('Puzzle Game\n')
    console.log('Use numbers to move tiles. Press q to quit.')

    tiles.forEach((row) => {
      console.log(row.map(tile => tile === null ? '  ' : tile.toString().padStart(2)).join(' | '))
      console.log('-'.repeat(PUZZLE_SIZE * 5))
    })
  }

  async getMove() {
    return new Promise((resolve) => {
      this.rl.question('Enter number you want to switch with the empty tile: ', (input) => {
        if (input.toLowerCase() === 'q') {
          resolve('quit')
        } else {
          const number = Number(input)

          resolve(number)
        }
      })
    })
  }

  displayMessage(message) {
    console.log(`\n${message}`)
  }

  close() {
    this.rl.close()
  }
}

module.exports = { IOHandler }