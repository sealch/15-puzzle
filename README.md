# 15 Puzzle Game

A command-line implementation of the classic 15 puzzle sliding game. Players need to arrange the numbered tiles in ascending order by sliding them into the empty space.

## Features

- Random puzzle generation with solvability check
- Command-line interface with clear board display
- Move validation and error handling
- Configurable puzzle size through environment variables


## Configuration

The puzzle size can be configured using environment variables:

1. Create a `.env` file in the root directory
2. Set the puzzle size (default is 4):

```bash
PUZZLE_SIZE=4
```

## How to run

Start the game:
```bash
npm start
```

## Testing

1. Install dependencies:
```bash
npm i
```

2. Run tests:
```bash
npm test
```


