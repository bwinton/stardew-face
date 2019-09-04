import clock from "clock";
import document from "document";
import * as util from "../common/utils";

import * as messaging from "messaging";

clock.granularity = "seconds";

let myLabel = document.getElementById("exampleText");

messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

clock.ontick = (evt) => {
  if( messaging.peerSocket.readyState === messaging.peerSocket.OPEN ) {
    messaging.peerSocket.send( { key: "test", value: "lol" } );
  }
  let text = util.getString( );
  myLabel.text = `${text}`
};
