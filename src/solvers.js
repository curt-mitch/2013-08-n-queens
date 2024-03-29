// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n, all){
  var solved = false;
  all = all || false;
  // Start with an empty board
  var boardLayout = [];
  var newRow = [];
  var solutions = {};
  for (var i = 0; i < n; i++) {
    newRow.push(0);
  }
  for (var j = 0; j < n; j++) {
    boardLayout[j] = newRow.slice();
  }
  var board = new Board(boardLayout);
  var traverser = function(boardLayout, newRowNumber) {
    // List out the columns that already have rooks, so we can skip them
    var rookColumns = _(boardLayout).map(function(row) {
      return _(row).indexOf(1);
    });
    if (!solved || all) {
      var traverseBoard = new Board(boardLayout);
      // thisRow = array of 0s
      var thisRow = traverseBoard.get(newRowNumber);
      for (var i = 0; i < thisRow.length; i++) {
        if (!_(rookColumns).contains(i)) {
          thisRow[i] = 1;
          traverseBoard.set(newRowNumber,thisRow.slice());
          thisRow[i] = 0;
          if (newRowNumber === thisRow.length-1) {
            if (!traverseBoard.hasAnyRooksConflicts()) {
              board = new Board(traverseBoard.rows());
              solutions[JSON.stringify(traverseBoard.rows())] = true;
              solved = true;
            }
          } else {
            traverser(traverseBoard.rows(),newRowNumber+1);
          }
        }
      }
    }
  };
  traverser(board.rows(),0);
  console.log('Single solution for ' + n + ' rooks:', solved);
  if (all) {
    return solutions;
  } else return board.rows();
};

window.countNRooksSolutions = function(n){
  var solutionCount = Object.keys(this.findNRooksSolution(n, true)).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n, all){
  var solved = false;
  all = all || false;
  // Start with an empty board
  var boardLayout = [];
  var newRow = [];
  var solutions = {};
  for (var i = 0; i < n; i++) {
    newRow.push(0);
  }
  for (var j = 0; j < n; j++) {
    boardLayout[j] = newRow.slice();
  }
  var board = new Board(boardLayout);
  var traverser = function(boardLayout, newRowNumber, queenDiagonals) {
    // List out the columns that already have rooks, so we can skip them
    var queenColumns = _(boardLayout).map(function(row) {
      return _(row).indexOf(1);
    });
    queenDiagonals = queenDiagonals || [];
    if (!solved || all) {
      var traverseBoard = new Board(boardLayout);
      // thisRow = array of 0s
      var thisRow = traverseBoard.get(newRowNumber);
      for (var i = 0; i < thisRow.length; i++) {
        console.log('should not find '+ i + ' in the '+newRowNumber+' array: '+queenDiagonals[newRowNumber]);
        if (!_(queenColumns).contains(i) && !_(queenDiagonals[newRowNumber]).contains(i)) {
          thisRow[i] = 1;
          traverseBoard.set(newRowNumber,thisRow.slice());
          thisRow[i] = 0;
          if (newRowNumber === thisRow.length-1) {
            if (!traverseBoard.hasAnyQueensConflicts()) {
              board = new Board(traverseBoard.rows());
              solutions[JSON.stringify(traverseBoard.rows())] = true;
              solved = true;
            }
          } else {
            if (queenDiagonals[newRowNumber]) {
              queenDiagonals[newRowNumber].push(i);
              console.log('pushed '+i+' to row '+newRowNumber);
            } else {
              queenDiagonals[newRowNumber] = [i];
              console.log('pushed '+i+' to row '+newRowNumber);
            }
            traverser(traverseBoard.rows(),newRowNumber+1,queenDiagonals);
          }
        }
      }
    }
  };
  traverser(board.rows(),0);
  console.log('Single solution for ' + n + ' queens:', solved);
  if (all) {
    console.log(solutions);
    return solutions;
  } else {
    console.log(board.rows());
    return board.rows();
  }
};

window.countNQueensSolutions = function(n){
  var solutionCount = Object.keys(this.findNQueensSolution(n, true)).length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
