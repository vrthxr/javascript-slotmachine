# JavaScript Slot Machine

My first JavaScript project: a command-line slot machine game built with Node.js.

You deposit a starting balance, choose how many lines to bet on, place your bet, and spin a 3x3 reel. When all symbols on a line match, you win the bet multiplied by that symbol's value. You keep playing until you cash out or run out of money.

## How the game works

1. Deposit a starting balance.
2. Choose how many lines to bet on (1-3).
3. Set your bet per line (it can't be more than your balance allows).
4. The machine spins a 3x3 grid of symbols (A, B, C, D).
5. A line pays out only when all of its symbols are equal. Rarer symbols pay more:

| Symbol | Copies per reel | Multiplier |
| :----: | :-------------: | :--------: |
|   A    |        2        |     5x     |
|   B    |        4        |     4x     |
|   C    |        6        |     3x     |
|   D    |        8        |     2x     |

6. Choose whether to play again or stop.

## Requirements

- [Node.js](https://nodejs.org/en/download)

## Running it

```bash
git clone https://github.com/vrthxr/javascript-slotmachine.git
cd javascript-slotmachine
npm install
node project.js
```

## Building it from scratch

If you'd rather recreate the project yourself:

```bash
npm init -y
npm install prompt-sync
```

`prompt-sync` is the package used to read input from the terminal synchronously, which keeps the game loop simple.

## Notes

The code is heavily commented in Portuguese, explaining the logic step by step so it's readable even if you're not sure what's going on.

### Thinking process

The flow I sketched out while building it (with a `while` loop, so I'd remember it):

![thinking process diagram](https://github.com/vrthxr/javascript-slotmachine/assets/112681075/1aa50d64-ad8f-4d44-8321-5a8b3f02b932)
