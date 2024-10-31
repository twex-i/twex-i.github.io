let ws, playing, grid, player;

function setup() {
  playing = false;
  grid = [[null, null, null], [null, null, null], [null, null, null]];
  createCanvas(400, 450);
  background(200);
  strokeWeight(3);
  line(133,0,133,400);//grid
  line(267,0,267,400);
  line(0,133,400,133);
  line(0,267,400,267);
  noStroke();
  fill(125);
  rect(0,400,400,450);// score/status zone
  fill(150,0,150);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Connecting...', 200, 425);
  noLoop();
  wsinit();
}

function wsinit() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket('wss://tictacws.twex.repl.co');
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  ws.onmessage = async ({ data }) => {
    msghandler(data)};
  ws.onclose = function() {
    ws = null;
  }
}

async function msghandler(data) {
  if (data == "connected!") {
    console.log("we're in !");
    noStroke();
    fill(125);
    rect(0,400,400,450);// score/status zone
    fill(150,0,150);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Matchmaking...', 200, 425);
  } else if (data == "player1") {
    playing = true;
    player = 1;
    noStroke();
    fill(125);
    rect(0,400,400,450);// score/status zone
    fill(0,250,0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Player 1', 200, 425);
  } else if (data == "player2") {
    player = 2;
    noStroke();
    fill(125);
    rect(0,400,400,450);// score/status zone
    fill(250,0,0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Player 2', 200, 425);
  } else if (typeof(data)=="object") {
    datatext = await data.text();
    move = datatext.split(",");
    grid[move[2]][move[3]]=move[1];
    strokeWeight(2);
    stroke(10);
    noFill();
    if (move[1]==1) {
      console.log("b")
      line(move[2]*133+26,move[3]*133+26, move[2]*133+104,move[3]*133+104);
      line(move[2]*133+104,move[3]*133+26, move[2]*133+26,move[3]*133+104);
    } else {
      circle(move[2]*133+67,move[3]*133+67,65);
    }
    playing=true;
  }
}

function mouseReleased() {
  if (playing) {
    const cell = [floor(mouseX/133), floor(mouseY/133)];
    if (grid[cell[0]][cell[1]]==null) {
      grid[cell[0]][cell[1]]=player;
      ws.send("m,"+player.toString()+","+cell[0]+","+cell[1]);
      strokeWeight(2);
      stroke(10);
      if (player==1) {
        console.log("b")
        line(cell[0]*133+26,cell[1]*133+26, cell[0]*133+104,cell[1]*133+104);
        line(cell[0]*133+104,cell[1]*133+26, cell[0]*133+26,cell[1]*133+104);
      } else {
        circle(cell[0]*133+67,cell[1]*133+67,50);
      }
      playing=false;
    }
  }
}