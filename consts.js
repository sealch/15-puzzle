require('dotenv').config()

const {
  PUZZLE_SIZE = 4
} = process.env


module.exports = {
  PUZZLE_SIZE: Number(PUZZLE_SIZE),
}