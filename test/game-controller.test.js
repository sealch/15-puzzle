const { GameController } = require('../src/game-controller')
const mockIOHandler = require('./mocks/io-handler')
const { Board } = require('../src/board')

describe('GameController', () => {
  let board
  let gameController
  beforeEach(() => {
    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, null],
        [13, 14, 15, 12]
      ]
    })

    gameController = new GameController(board, mockIOHandler)
  })

  it('should handle starting the game', async () => {
    mockIOHandler.getMove.mockResolvedValue(11)
    mockIOHandler.getMove.mockResolvedValue('quit')

    await gameController.start()

    expect(mockIOHandler.displayBoard).toHaveBeenCalledWith(board.getTiles())
  })

  it('should handle winning the game', async () => {
    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, null, 15]
      ]
    })

    mockIOHandler.getMove.mockResolvedValue(15)

    gameController = new GameController(board, mockIOHandler)

    await gameController.start()

    expect(mockIOHandler.displayMessage).toHaveBeenCalledWith('Congratulations! You won!')

  })
})