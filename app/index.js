import clock from "clock";
import * as messaging from "messaging";
import * as constants from "./constant";
import { today } from "user-activity";
import { battery } from "power";

import { calculateSeason, hslToRgb } from "../common/utils";

import { preferences, locale } from "user-settings";

let currentWaterFrame = 0;

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

  // calculate season based on ticked date
  let currentSeason = calculateSeason( evt.date );

  // update map background
  currentWaterFrame = ( ( currentWaterFrame + 1 ) % constants.WaterFrameCount );
  currentWaterFrame = currentWaterFrame == 0 ? 4 : currentWaterFrame;
  constants.water.href = "map/water" + currentWaterFrame + ".png";
  constants.map.href="map/" + currentSeason + ".png";

  // update clock
  constants.season.href = "clock/season/" + currentSeason + ".png";

  let day;
  switch( locale.language.split( "-" )[ 0 ] ) {
    default:
    case "en":
      day = constants.WeekDayEnglish[ evt.date.getDay( ) ];
      break;
    case "fr":
      day = constants.WeekDayFrench[ evt.date.getDay( ) ];
      break;
    case "de":
      day = constants.WeekDayDeutch[ evt.date.getDay( ) ];
      break;
    case "es":
      day = constants.WeekDaySpanish[ evt.date.getDay( ) ];
      break;
  }
  let dateContent = day + ". " + evt.date.getDate( );
  constants.dateLabel.text = dateContent;
  constants.dateShadowLabel.text = dateContent;

  let stepText = "";
  for( let i = ( "" + today.adjusted.steps ).length; i < 8; i++ )
    stepText += " ";
  stepText += today.adjusted.steps;
  constants.stepLabel.text = stepText;

  let timeContent = "";
  if( preferences.clockDisplay === "12h" ) {
    timeContent = ( ( evt.date.getHours( ) < 12 ) ? ( ( evt.date.getHours( ) == 0 ) ? 12 : evt.date.getHours( ) + "" ) : ( ( evt.date.getHours( ) % 12 == 0 ) ? 12 : ( evt.date.getHours( ) % 12 ) + "" ) ) + ( evt.date.getSeconds( ) % 2 == 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + " " + ( ( evt.date.getHours( ) < 12 ) ? "am" : "pm" );
  } else {
    timeContent = evt.date.getHours( ) + ( evt.date.getSeconds( ) % 2 == 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) );
  }
  constants.timeLabel.text = timeContent;
  constants.timeShadowLabel.text = timeContent;

  let totalSecondPassedToday = ( evt.date.getHours( ) * 3600 ) + ( evt.date.getMinutes( ) * 60 ) + evt.date.getSeconds( ); 
  let handAngle = ( totalSecondPassedToday / 86400 ) * 180;
  constants.clockHand.groupTransform.rotate.angle = handAngle;

  // update energy bar
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
};
