var socket = io.connect('http://192.168.100.14:1984', {'forceNew': true});
// var socket = io.connect('http://localhost:1984', {'forceNew': true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.nickname} dice:</strong>
                <p>${message.text}</p>
            </div> 
        `);    
    }).join(' ');
    
    var div_message = document.getElementById('message');
    div_message.innerHTML = html;
    div_message.scrollTop = div_message.scrollHeight;
}

function addMessage(text) {  
    var data = {
      nickname: document.getElementById('nickname').value,
      text: document.getElementById('text').value  
    };
    
    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').value = "";
    socket.emit('add-message', data);
    
    return false;
}