import clock from "clock";

import document from "document";

import * as messaging from "messaging";

import * as constants from './const';

messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

messaging.peerSocket.onmessage = evt => {

}

clock.ontick = (evt) => {
  if( messaging.peerSocket.readyState === messaging.peerSocket.OPEN ) {
    //messaging.peerSocket.send( "hello" );
  }

  let dateContent = constants.WeekDay[ evt.date.getDay( ) ] + ". " + evt.date.getDate( );
  constants.dateLabel.text = dateContent;
  constants.dateShadowLabel.text = dateContent;

  let timeContent = ( evt.date.getHours( ) % 12 ) + ":" + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + " " + ( ( Math.floor( evt.date.getHours( ) / 12 ) <= 0 ? "am" : "pm" ) );
  constants.timeLabel.text = timeContent;
  constants.timeShadowLabel.text = timeContent;

  let totalSecondPassedToday = ( evt.date.getHours( ) * 3600 ) + ( evt.date.getMinutes( ) * 60 ) + evt.date.getSeconds( ); 
  let handAngle = ( totalSecondPassedToday / 86400 ) * 180;
  document.getElementById( "clockHand" ).groupTransform.rotate.angle = handAngle;
};
