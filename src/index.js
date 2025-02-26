const { Board } = require('./board')
const { IOHandler } = require('./io-handler')
const { GameController } = require('./game-controller')

const startGame = () => {
  const board = new Board()
  const ioHandler = new IOHandler()
  const gameController = new GameController(board, ioHandler)

  gameController.start()
}

startGame()
