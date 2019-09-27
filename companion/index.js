import * as messaging from "messaging";
import { me } from "companion";
import { settingsStorage } from "settings";
import * as common from "../common/constant"

if (me.launchReasons.settingsChanged) {
	sendAllParameter( );
}

messaging.peerSocket.onmessage = evt => {
	//console.log( evt )
};

messaging.peerSocket.onopen = evt => {
	//console.log( "Companion socket opened" )
};

messaging.peerSocket.close = () => {
	//console.log("Companion Socket Closed");
};

messaging.peerSocket.onmessage = evt => {
	sendAllParameter( );
};

function sendAllParameter( ) {
	for( let i = 0; i < common.OPTION_LIST.length; i++ ) {
		sendValue(common.OPTION_LIST[ i ],
			settingsStorage.getItem(common.OPTION_LIST[ i ]));
	}
}

settingsStorage.onchange = function(evt) {
	sendValue( evt.key,
		evt.newValue );
};

function sendValue( key, value ) {
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send({key: key, value: JSON.parse(value)});
	}
}
