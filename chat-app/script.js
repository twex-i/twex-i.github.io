const c = ["red", "yellow", "lime", "aqua", "blue", "orange"];
let ws, patrices, index;
index = 0;
patrices = [];

setInterval(() => {
  for (elt of patrices) {
    elt.style.color = c[index % 6];
  }
  index++
}, 125);

const therock = new Freezeframe('#therock', {
  trigger: false,
  responsive: false
});
const audio = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3');
audio.loop = false;

function co() {
  let a = document.getElementById('name');
  name = a.value;
  a.value = "";
	document.getElementById('B1').hidden=true;
  document.getElementById('msg').value = "";
	const l = document.getElementsByClassName('chat');
  for (e of l) {
    e.style.visibility="visible";
  }
  a = document.getElementById('edit');
  a.innerHTML = `Welcome to the iChat | you are connected as ${name}`;
};

function send() {
  if (!ws) {
    showMessage("System&|&No WebSocket connection :(");
    return ;
  }

  let value = document.getElementById('msg').value;

  if (value.startsWith("/")) {
    if (value.startsWith("/color")) {
      const color = value.split(" ")[1]
      try {
        document.getElementsByTagName("body")[0].style.setProperty("--text-color", color)
      } catch (error) {
        showMessage("System&|&Wrong color format");
      }
    }
    
    document.getElementById('msg').value = ""
    return;
  }
  
  ws.send(name + "&|&" + value);
  showMessage(name + "&|&" + value);
  document.getElementById('msg').value = "";
};

async function showMessage(msg) {
  [msgname, msgtext] = msg.split("&|&");
  let p = document.createElement("p");
  let d = new Date;
  p.innerHTML = d.toLocaleTimeString() + " | " + msgname + " > " + msgtext;
  if (msgname.toLowerCase().includes("patrice")) { patrices.push(p); }
  document.getElementById("messages").appendChild(p);
  if (msgtext.toLowerCase().includes("sus")) {
    const tr = document.getElementById('therock');
    tr.style.visibility="visible";
    audio.play();
    therock.start(); // start animation
    await new Promise(r => setTimeout(r, 1300)); //sleep 4.7sec
    therock.stop(); // stop animation
    tr.style.visibility="hidden";
  }
}

function init() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket('wss://chat-api.twex.repl.co'); //wss://multiplayer.twex.repl.co
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  ws.onmessage = async ({ data }) => {
    /*const text = await data.text();
    showMessage(text)};*/
    showMessage(data)};
  ws.onclose = function() {
    ws = null;
  }
}

init();