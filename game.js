const { createEmptyMatch } = require("./helpers/createEmptyMatch");
const { generateMatch, print } = require("./helpers/generateMatch");
const { putFlag } = require("./helpers/putFlag");
const { selectSquare } = require("./helpers/selectSquare");

const matchesSolo = new Map();

class Connection {
    constructor(io, socket) {
      this.socket = socket;
      this.io = io;

      console.log(socket.id + ' se conecto');

      socket.on('startSolo', (value) => this.startSolo(value))
      socket.on('sendPlay', (value) => this.play(value))
      socket.on('flag', (value) => this.flag(value))
      socket.on('disconnect', () => this.disconnect());
      socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    }

    disconnect = () => {
      console.log(this.socket.id + ' se desconecto')
    }

    startSolo = value => {
      const {bombs, height, width, initialX, initialY} = value;
      const match = generateMatch(width - 1,height - 1,initialX,initialY,bombs);
      let actualMatch = createEmptyMatch(width,height, initialX, initialY);



      const info = selectSquare(match,actualMatch, initialX, initialY,height,width)

      this.socket.emit('playSquare', info);


      actualMatch = info.actualMatch

      matchesSolo.set(this.socket.id,{
        actualMatch,
        height,
        width,
        match
      })
    }

    play = value => {
      //
        const {posX, posY} = value
        let {actualMatch, height, width, match} = matchesSolo.get(this.socket.id)

        const info = selectSquare(match, actualMatch, posX, posY, height, width)

        this.socket.emit('playSquare', info);

        actualMatch = info.actualMatch

        matchesSolo.set(this.socket.id, {
            ...matchesSolo.get(this.socket.id),
            actualMatch
        })
    }

    flag = value => {
      const {posX, posY} = value
      let {actualMatch, height, width} = matchesSolo.get(this.socket.id)

      const square = actualMatch[posY][posX]

      actualMatch[posY][posX] = {
        ...square,
        isFlag: (square.isFlag) ? false : true
      }

      this.socket.emit('playSquare', {actualMatch})

      matchesSolo.set(this.socket.id,{
        ...matchesSolo.get(this.socket.id),
        actualMatch
      })

    }
}

function game(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
};

module.exports = game;