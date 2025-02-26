const { Board } = require('../src/board')
const { PUZZLE_SIZE } = require('../consts')
describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board()
  })

  it(`should initialize board with ${PUZZLE_SIZE}x${PUZZLE_SIZE} tiles`, () => {
    const tiles = board.getTiles()

    expect(tiles.length).toBe(PUZZLE_SIZE)

    tiles.forEach(row => {
      expect(row.length).toBe(PUZZLE_SIZE)
    })
  })

  it(`should have numbers 1-${PUZZLE_SIZE * PUZZLE_SIZE - 1}`, () => {
    const tiles = board.getTiles()
    const numbers = tiles.flat().filter(tile => tile !== null)
    const sortedNumbers = numbers.sort((a, b) => a - b)

    expect(sortedNumbers).toEqual(Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE - 1 }, (_, i) => i + 1))
  })

  it('should detect valid moves', () => {
    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, null],
        [13, 14, 15, 12]
      ]
    })

    expect(board.isValidMove(11)).toBe(true)
    expect(board.isValidMove(12)).toBe(true)
    expect(board.isValidMove(8)).toBe(true)
    expect(board.isValidMove(1)).toBe(false)
  })

  it('should move tiles correctly', () => {
    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, null],
        [13, 14, 15, 12]
      ]
    })

    board.move(11)

    expect(board.getTiles()).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, null, 11],
      [13, 14, 15, 12]
    ])
  })

  it('should detect when the game is won', () => {
    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null]
      ]
    })

    expect(board.isWon()).toBe(true)

    board = new Board({
      initialState: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, null],
        [13, 14, 15, 12]
      ]
    })

    expect(board.isWon()).toBe(false)
  })
})