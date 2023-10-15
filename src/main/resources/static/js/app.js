const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/websocket'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', (message) => {
        onReceivedMessage(JSON.parse(message.body))
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function sendMessage(event) {
    event.preventDefault();

    const textArea = document.getElementById("message-input");
    const message = textArea.value;
    textArea.value = "";

    if (message === null || message.trim().length === 0) {
        return;
    }

    stompClient.publish({
        destination: "/send/message",
        body: JSON.stringify({
            message: message
        })
    });

    console.log('Sended: ' + message);
}

function onReceivedMessage(message) {
    const value = message.message;

    if (!value) {
        return;
    }

    const el = document.createElement("div");

    el.innerText = value;
    el.classList.add("message", "appear");
    document.getElementById("messages").prepend(el);

    console.log('Received: ' + value);
}

function submitOnEnter(event) {
    if (event.which === 13  && !event.shiftKey) {
        if (!event.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            event.target.form.dispatchEvent(newEvent);
        }

        event.preventDefault();
    }
}

window.onload = (e) => {
    document.getElementById("message-input").addEventListener("keydown", submitOnEnter);
    stompClient.activate();
}