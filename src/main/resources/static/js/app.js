const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/websocket'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', (message) => {
        console.log(JSON.parse(message.body).message)
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function sendName() {
    stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify({
            message: "123"
        })
    });
}

function sendMessage() {
    stompClient.publish(
        JSON.stringify({
            message: document.getElementById("message").textContent
        })
    )
}