const { Board } = require('./board')
const { IOHandler } = require('./io-handler')
const { GameController } = require('./game-controller')

const startGame = () => {
  const ioHandler = new IOHandler()

  try {
    const board = new Board()
    const gameController = new GameController(board, ioHandler)

    gameController.start()
  } catch (e) {
    ioHandler.displayMessage(e.message)
    ioHandler.close()
  }
}

startGame()
