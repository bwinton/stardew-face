import * as messaging from "messaging";

messaging.peerSocket.onmessage = evt => {
    console.log( evt )
};

messaging.peerSocket.onopen = evt => {
    console.log( "Companion socket opened" )
};

messaging.peerSocket.close = () => {
    console.log("Companion Socket Closed");
};

messaging.peerSocket.onmessage = evt => {
    // evt.data
};
