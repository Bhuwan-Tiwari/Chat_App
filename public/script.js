//script.js js use to write js code in frontend
let btn = document.getElementById('btn')

var socket = io()  //its started a connection event
//from any of the machine lets browser create websocket object then a new websocket connection is establish in backet server recive that connection usid io.on
//we make a socket connection here  

btn.onclick = function exec() {
    socket.emit('from_client')
}

socket.on('from_server', ()=>
{
    console.log("collect a new event from server")
    const div = document.createElement('div')
    div.innerText = 'new event from server'
    console.log(div)
    document.body.appendChild(div)
})     