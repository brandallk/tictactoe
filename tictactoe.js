var board1 = [['x',   'o',  'o'],
              ['x',  null, null],
              [null, null,  'x']
             ]

var board2 = [['x',  'o',  'o'],
              ['x', null, null],
              ['x', null,  'o']
             ]

console.log(turnResult(board1)) // => "o goes next"
console.log(turnResult(board2)) // => "Winner: x"

function turnResult(board) {
  var gameWinner = winner(board)
  if (gameWinner) {
    return "Winner: " + gameWinner
  }

  xTurnCount = turnsTaken(board, 'x')
  oTurnCount = turnsTaken(board, 'o')
  if (xTurnCount === oTurnCount + 1) {
    return "o goes next"
  }
  else if (xTurnCount === oTurnCount ) {
    return "x goes next"
  }
  else {
    return "Someone took too many turns"
  }
}

function turnsTaken(board, player) {
  var count = 0
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (board[i][j] === player) {
        count++
      }
    })
  })
  return count
}

function winner(board) {
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      var position = { row: row, col: col }
      var winner = testPosition(position, board)
      if (winner) {
        return winner
      }
    }
  }
  return false
}

function testPosition(startPos, board) {
  var row = startPos.row
  var col = startPos.col
  var char = board[row][col]
  var winCount = board[0].length

  var vectors = {
    topToBottom: { i: 1, j: 0 },
    bottomToTop: { i: -1, j: 0 },
    leftToRight: { i: 0, j: 1 }, 
    rightToLeft: { i: 0, j: -1 }, 
    topLeftToBottomRight: { i: 1, j: 1 },
    bottomRightToTopLeft: { i: -1, j: -1 }
  }

  function conditions(x) {
    var cond1 = x !== null
    var cond2 = x > -1
    var cond3 = x <= winCount-1
    return cond1 && cond2 && cond3
  }

  for (var vector in vectors) {
    var count = 0
    var i = row
    var j = col
    while(conditions(i) && conditions(j)) {
      if (board[i][j] === char) {
        count++
      }
      i += vectors[vector].i
      j += vectors[vector].j
    }
    if (count === winCount) {
      return char
    }
  }
  return false
}
