new Vue({
    el: '#app',
    data: {
        data: null
    },
    created: function () {
        var self = this;
        
        let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

        socket.onopen = () => console.log("Successfully Connected");

        socket.onclose = event => {
          console.log("Socket Closed Connection: ", event);
          socket.send("Client Closed!");
        };

        socket.onerror = error => console.log("Socket Error: ", error);

        socket.onmessage = event => {
            try {
                let data = JSON.parse(event.data);
                self.data = data;
            } catch (err) { console.log(err); };
        }
    }
});