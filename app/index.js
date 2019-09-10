import clock from "clock";
import * as messaging from "messaging";
import * as constants from "./const";
import { calculateSeason, hslToRgb } from "../common/utils";

import { today } from "user-activity";

import { battery } from "power";

let waterFrame = 0;

messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

messaging.peerSocket.onmessage = evt => {

}

constants.root.onclick = (evt) => {
  constants.clockElement.style.visibility = constants.clockElement.style.visibility === "hidden" ? "visible" : "hidden";
  constants.energyBarContainer.style.visibility = constants.energyBarContainer.style.visibility === "hidden" ? "visible" : "hidden";
}

clock.ontick = (evt) => {
  if( messaging.peerSocket.readyState === messaging.peerSocket.OPEN ) {
    //messaging.peerSocket.send( "hello" );
  }

  let currentSeason = calculateSeason( evt.date );

  waterFrame = ( ( waterFrame + 1 ) % constants.WaterFrameCount );
  waterFrame = waterFrame == 0 ? 4 : waterFrame;
  constants.water.href = "map/water" + waterFrame + ".png";
  constants.map.href="map/" + currentSeason + ".png";

  if( constants.clockElement.style.visibility === "visible" ) {
    constants.season.href = "clock/season/" + currentSeason + ".png";

    let dateContent = constants.WeekDay[ evt.date.getDay( ) ] + ". " + evt.date.getDate( );
    constants.dateLabel.text = dateContent;
    constants.dateShadowLabel.text = dateContent;

    let stepText = "";
    for( let i = 8 - ( "" + today.adjusted.steps ).length; i < 8; i++ )
      stepText += " ";
    stepText += today.adjusted.steps;
    constants.goldLabel.text = stepText;

    let timeContent = ( evt.date.getHours( ) == 0 ? 12 : ( evt.date.getHours( ) % 13 ) ) + ( evt.date.getSeconds( ) % 2 == 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + " " + ( ( Math.floor( evt.date.getHours( ) / 12 ) <= 0 ? "am" : "pm" ) );
    constants.timeLabel.text = timeContent;
    constants.timeShadowLabel.text = timeContent;

    let totalSecondPassedToday = ( evt.date.getHours( ) * 3600 ) + ( evt.date.getMinutes( ) * 60 ) + evt.date.getSeconds( ); 
    let handAngle = ( totalSecondPassedToday / 86400 ) * 180;
    constants.clockHand.groupTransform.rotate.angle = handAngle;
  }

  if( constants.energyBarContainer.style.visibility === "visible" ) {
    let level = battery.chargeLevel;
    let energyBarHeight = Math.floor( level / 100 * constants.energyBarLength );
    constants.energyBar.height = energyBarHeight;
    constants.energyBar.y = constants.energyBarLength - energyBarHeight;
    let hue = 120 * ( level / 100 );
    let rgb = hslToRgb( hue / 360, 1, 0.5 );
    let fillColor = "#";
    rgb.forEach( function( element ) {
      let value = element.toString( 16 );
      fillColor += ( value.length == 1 ? "0" : "" ) + value;
    });
    constants.energyBar.style.fill = fillColor;
  }
};
