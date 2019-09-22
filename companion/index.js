import * as messaging from "messaging";
import { me } from "companion";
import { settingsStorage } from "settings";
import * as common from "../common/constant"

if (me.launchReasons.settingsChanged) {
    sendAllParameter( );
}

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
    sendAllParameter( );
};

function sendAllParameter( ) {
    sendValue(common.IS_SHOWING_SECONDS,
        settingsStorage.getItem(common.IS_SHOWING_SECONDS));
}

// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
    sendValue( evt.key,
        evt.newValue );
};

function sendValue( key, value ) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({key: key, value: JSON.parse(value)});
    } else {
        console.log("No peerSocket connection");
    }
}
