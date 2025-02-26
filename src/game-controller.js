class GameController {
  constructor (board, ioHandler) {
    this.board = board
    this.ioHandler = ioHandler
    this.isRunning = false
  }

  async start() {
    this.isRunning = true
    let error


    while (this.isRunning) {
      this.ioHandler.displayBoard(this.board.getTiles())

      if (error) {
        this.ioHandler.displayMessage(error)
        error = null
      }

      const move = await this.ioHandler.getMove()

      if (move === 'quit') {
        this.isRunning = false
        break
      }

      if (!move || !this.board.isValidMove(move)) {
        error = 'Invalid move. Try again.'
        continue
      }

      this.board.move(move)

      if (this.board.isWon()) {
        this.ioHandler.displayBoard(this.board.getTiles())
        this.ioHandler.displayMessage('Congratulations! You won!')
        this.isRunning = false
      }
    }

    this.ioHandler.close()
  }
}


module.exports = { GameController }