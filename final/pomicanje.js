const five = require('johnny-five');

const MAX_SPEED_L = 150;
const MAX_SPEED_R = 150;

const stdin = process.stdin;
stdin.setRawMode(true);

const board = new five.Board({
  port: process.argv[2],
});

let leftMotor = null;
let rightMotor = null;

board.on('ready', (err) => {
  if(err) {
    console.log(err);
    return;
  }

  leftMotor = new five.Motor({
    pins: {
      pwm: 6,
      dir: 7,
    },
  });

  rightMotor = new five.Motor({
    pins: {
      pwm: 5,
      dir: 4,
    },
  });

  console.log('Robot spojen.');
});

stdin.on('keypress', (chunk, key) => {
  if(key) {
    switch(key.name) {
      case 'up':
        leftMotor.reverse(MAX_SPEED_L);
        rightMotor.forward(MAX_SPEED_R);
        break;
      case 'down':
        rightMotor.reverse(MAX_SPEED_R);
        leftMotor.forward(MAX_SPEED_L);
        break;
      case 'left':
        leftMotor.forward(MAX_SPEED_L);
        rightMotor.forward(MAX_SPEED_R);
        break;
      case 'right':
        leftMotor.reverse(MAX_SPEED_L);
        rightMotor.reverse(MAX_SPEED_R);
        break;
      case 'space':
        rightMotor.stop();
        leftMotor.stop();
    }
  }
})