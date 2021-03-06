

/* board objects
const roundTime = 15;






  to(position) {
    if(position[0] >= this.dimension || position[0] < 0 || position[1] >= this.dimension || position[1] < 0) {
      this.gameInProgress = false;
    }
    else if(this.grid[position[0]][position[1]]) {
      this.position.forEach(function(element) {
        if(element[0] === position[0] && element[1] === position[1]) {
          this.gameInProgress = false;
        }
      });
      if(this.gameInProgress) {
        this.position.unshift(position);
        this.makeNextMove();
        this.placeFood();
        this.speed *= 0.9;
        ++this.count;
        score(this.count);
      }
    }
    else {
      this.toggleSquare(this.position.pop());
      this.position.unshift(position);
      this.toggleSquare(position);
    }
	}

  makeNextMove() {
    let head = this.position[0];
    switch(this.direction) {
      case 'u':
        this.to([head[0] - 1, head[1]]);
        break;
      case 'd':
        this.to([head[0] + 1, head[1]]);
        break;
      case 'l':
        this.to([head[0], head[1] - 1]);
        break;
      case 'r':
        this.to([head[0], head[1] + 1]);
        break;
    }
  }

  toggleSquare(position) {
    this.grid[position[0]][position[1]] = !this.grid[position[0]][position[1]];
  }

  rand() {

  }

  placeFood() {
    this.toggleSquare([this.rand(), this.rand()]);
  }

  reverse() {
    let newSnakePosition = [];
    this.position.forEach(function(element) {
      newSnakePosition.unshift(element);
    });
    this.position = newSnakePosition;
  }


  render() {
    this.$container.children().remove();
    for(let i = 0; i < this.grid.length; ++i) {
      for(let j = 0; j < this.grid[i].length; ++j) {
        let snakeClass = '';
        if(this.grid[i][j]) {
          snakeClass = 'snake';
        }
        this.$container.append(`<div class="square ${snakeClass}" ></div>`);
      }
    }
  }
}

$('.container').keydown(function(event) {
  switch(event.which) {
  	case 38:
    	if(snake.direction === 'd') {
      	snake.reverse();
      }
    	snake.direction = 'u';
      break;
    case 40:
    	if(snake.direction === 'u') {
      	snake.reverse();
      }
    	snake.direction = 'd';
      break;
    case 37:
    	if(snake.direction === 'r') {
      	snake.reverse();
      }
    	snake.direction = 'l';
      break;
    case 39:
    	if(snake.direction === 'l') {
      	snake.reverse();
      }
    	snake.direction = 'r';
      break;
  }
});


const move = function(snake) {

  snake.makeNextMove();
  snake.render();
  if(snake.gameInProgress) {
  	setTimeout(function() {move(snake)}, snake.speed);
  }
  else {
  	nextRound();
  }
};

let snake;

$(function() {
  snake = new Snake();
  nextRound();
});


const score = function(count) {
	$('div.score').remove();
  $('.wrapper').prepend(`<div class="score">${count} points</div>`);
};

const nextRound = function() {
	$('div.score').append('<button>New Game</button>');
  $('button').on('click', function() {
  	this.remove();
    $('.container').focus();
    snake.resetGame();
    move(snake);
  });
}
*/
