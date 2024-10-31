// var infos1 = document.getElementsByClassName('infos1')
// var infos2 = document.getElementsByClassName('infos2')
// var infos3 = document.getElementsByClassName('infos3')

function reveal(number) {
  var list = document.getElementsByClassName('infos' + number)
  var x
  for (x of list)
    x.style.visibility="visible"
}

function hide(number) {
  var list = document.getElementsByClassName('infos' + number)
  var x
  for (x of list)
    x.style.visibility="hidden"
}

function blue() {
  document.getElementById('a').style.color="rgba(0, 238, 255, 0.801)"
}

function white() {
  document.getElementById('a').style.color="white"
}