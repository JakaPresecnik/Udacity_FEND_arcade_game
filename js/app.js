// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.floor(Math.random() * 699);
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(player.level >= 7) {
      if (this.x > 535) {
        this.speed = - this.speed;
      }else if (this.x < -30) {
        this.speed = - this.speed;
      }
    }
    else if(this.x > 700) {
      this.x = -100;
    }
    this.checkCollisions();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollisions = function() {
  if(this.x > player.x - 40 && this.x < player.x + 40) {
    if(this.y > player.y - 40 && this.y < player.y + 40){
      player.y = 383;
      player.health -= 1;

/*---->*/      console.log(player.health);
/*---->*/      console.log(player.points);

    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.level = 1;
  this.health = 3;
  this.points = 0;
}
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
  if (key === 'left' && this.x > 0) {
    this.x -= 101;
  }else if (key === 'right' && this.x < 505) {
    this.x += 101;
  }else if (key === 'up' && this.y > 0) {
    this.y -= 83;
  }else if (key === 'down' && this.y < 383) {
    this.y += 83;
  }
}   //DONE!
Player.prototype.update = function () {
  if (this.y <= 0) {
    this.points += 250;
    this.level += 1;
    this.y = 383;
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor(Math.random() * 699);
    });
    this.onLevelUp();
  }
};
Player.prototype.onLevelUp = function() {
  switch (this.level) {
    case 2:
      gems = [new Gems(303, 89, 1)];
      obstacles = [new Obstacle(404, 55, 0), new Obstacle(202, 0, 1), new Obstacle(303, 330, 1)];
      allEnemies.push(new Enemy(220, 200));
      break;
    case 3:
      gems = [new Gems(101, 170, 1), new Gems(505, 84, 0)];
      obstacles = [new Obstacle(303, 140, 0), new Obstacle(505, 220, 0), new Obstacle(101, 0, 1), new Obstacle(404, 0, 1)];
      allEnemies.push(new Enemy(300, 190));
      break;
    case 4:
      gems = [new Gems(0, 160, 2), new Gems(404, 89, 0)];
      obstacles = [new Obstacle(101, 55, 0), new Obstacle(505, 290, 0), new Obstacle(303, 55, 0), new Obstacle(101, 290, 0), new Obstacle(404, 0, 2)]
      allEnemies.forEach(function(enemy) {
        enemy.speed += 20;
      });
      allEnemies.push(new Enemy(140, 220));
      break;
    // This is where the game changes to sea.
    case 5:
      gems = [new Gems(101, 170, 0), new Gems(303, 248, 3), new Gems(505, 170, 1)];
      obstacles = [new Obstacle(0, 83, 2), new Obstacle(202, 249, 2), new Obstacle(303, 332, 2), new Obstacle(505, 83, 4), new Obstacle(404, 249, 4), new Obstacle(303, 0, 4)];
      allEnemies.push(new Enemy(300, 160));
      allEnemies.forEach(function(enemy) {
        enemy.speed += 20;
        enemy.sprite = 'images/shark-fin.png';
      });
      break;
    case 6:
      gems = [new Gems(0, 165, 3), new Gems(303, 254, 1), new Gems(404, 80, 2)];
      obstacles = [new Obstacle(0, 83, 4), new Obstacle(505, -20, 0), new Obstacle(101, 166, 4), new Obstacle(101, 332, 2), new Obstacle(202, 332, 2), new Obstacle(404, -20, 0), new Obstacle(303, 83, 2)]
      allEnemies.splice(0, 2, new Enemy(300, 180));
      allEnemies.forEach(function(enemy) {
        enemy.sprite = 'images/shark-fin.png';
        enemy.speed += 15;
      });
      break;
    case 7:
      gems = [new Gems(0, 252, 1), new Gems(505, 248, 2)];
      allEnemies.push(new Enemy(60, 100), new Enemy(60, 140));
      obstacles = [new Obstacle(0, 55, 3), new Obstacle(101, 55, 0), new Obstacle(303, 55, 3), new Obstacle(505, 55, 3), new Obstacle(303, 140, 0), new Obstacle(0, 140, 3), new Obstacle(505, 300, 0), new Obstacle(505, 380, 3)]
      allEnemies.forEach(function(enemy) {
      enemy.sprite = 'images/enemy-crab.png';
    });
  }
};

var Obstacle = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = obstacleImages[i];
};
Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Obstacle.prototype.update = function(key){
    if(this.x > player.x - 50 && this.x < player.x + 50) {
      if(this.y > player.y - 40 && this.y < player.y + 40){
        switch (key) {
          case 'left':
            player.x += 101;
            break;
          case 'right':
            player.x -= 101;
            break;
          case 'up':
            player.y += 83;
            break;
          case 'down':
            player.y -= 83;
        }
      }
  }

}

var Gems = function(x, y, i) {
  this.x = x;
  this.y = y;
  this.sprite = gemsImages[i];
};
Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Gems.prototype.update = function() {
  if(this.x > player.x - 40 && this.x < player.x + 40) {
    if(this.y > player.y - 40 && this.y < player.y + 40){
      switch (this.sprite) {
        case gemsImages[0]:
          player.health += 1;
          break;
        case gemsImages[1]:
          player.points += 200;
          break;
        case gemsImages[2]:
          player.points += 500;
          break;
        case gemsImages[3]:
          player.points += 1000;
          break;
      }
      gems.splice(gems.indexOf(this), gems.indexOf(this) + 1);

/*---->*/      console.log(player.health);
/*---->*/      console.log(player.points);
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var gems = []
var gemsImages = ['images/Heart.png', 'images/GemOrange.png', 'images/GemBlue.png', 'images/GemGreen.png']
var player = new Player(101, 383);
var allEnemies = [
  new Enemy(60, 150),
  new Enemy(60, 210),
  new Enemy(140, 180),
  new Enemy(220, 150),
];
var obstacles = [];
var obstacleImages = [
  'images/Rock.png',
  'images/bench.png',
  'images/signal-buoy.png',
  'images/palm-tree.png',
  'images/sea-rock.png'
]


/*---->*/ console.log(player.health);
console.log(player.noObstacle);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    obstacles.forEach(function(obstacle) {
      obstacle.update(allowedKeys[e.keyCode]);
    });
});
