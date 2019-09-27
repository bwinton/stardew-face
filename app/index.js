import clock from "clock";
import * as messaging from "messaging";
import * as constants from "./constant";
import * as common from "../common/constant"
import { today } from "user-activity";
import { battery } from "power";

import { calculateSeason, hslToRgb } from "../common/utils";

import { locale } from "user-settings";

import { HeartRateSensor } from "heart-rate";

let currentWaterFrame = 0;
let currentHeartBeat = 1;

let isDisplayingSeconds = false;
let isSouthHemisphere = false;
let isAmPm = true;
let isDisplayingMonth = false;

if (HeartRateSensor) {
	const hrm = new HeartRateSensor();
	hrm.addEventListener("reading", () => {
		constants.heartRateText.text = hrm.heartRate;
		constants.heartRateTextShadow.text = hrm.heartRate;
	});
	hrm.start();
}

messaging.peerSocket.onopen = () => {
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send("plz");
	} else {
		console.log("No peerSocket connection");
	}
};

messaging.peerSocket.close = () => {
	//console.log("App Socket Closed");
};

messaging.peerSocket.onmessage = evt => {
	switch( evt.data.key ) {
		case common.IS_SHOWING_SECONDS:
			isDisplayingSeconds = ( evt.data.value === true );
			break;
		case common.IS_SOUTH_HEMISPHERE:
			isSouthHemisphere = ( evt.data.value === true );
			break;
		case common.IS_24_HOURS_MODE:
			isAmPm = ( evt.data.value === false );
			break;
		case common.IS_DISPLAY_MONTH:
			isDisplayingMonth = ( evt.data.value === true );
			break;

		default:
			console.log( "unknown parameter key" );
			break
	}
};

constants.root.onclick = (evt) => {
	constants.clockElement.style.visibility = constants.clockElement.style.visibility === "hidden" ? "visible" : "hidden";
	constants.energyBarContainer.style.visibility = constants.energyBarContainer.style.visibility === "hidden" ? "visible" : "hidden";
};

clock.ontick = (evt) => {
	// calculate season based on ticked date
	let currentSeason = calculateSeason( evt.date,
		isSouthHemisphere );

	// update map background
	currentWaterFrame = ( ( currentWaterFrame + 1 ) % constants.WaterFrameCount );
	currentWaterFrame = currentWaterFrame === 0 ? 4 : currentWaterFrame;
	constants.water.href = "map/water" + currentWaterFrame + ".png";
	constants.map.href="map/" + currentSeason + ".png";

	// update clock
	constants.season.href = "clock/season/" + currentSeason + ".png";


	let currentLocalePrefix = locale.language.split( "-" )[ 0 ];
	let day;
	switch( currentLocalePrefix ) {
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
		case "it":
			day = constants.WeekDayItalian[ evt.date.getDay( ) ];
			break
	}
	let monthName = "";
	if( isDisplayingMonth ) {
		monthName = "/" + ( evt.date.getMonth( ) + 1 );
		/*switch( currentLocalePrefix ) {
			default:
			case "en":
				monthName = constants.MonthEnglish[ evt.date.getMonth() ];
				break;

			case "fr":
				monthName = constants.MonthFrench[ evt.date.getMonth() ];
				break;
		}*/
	}
	let dateContent = day + ". " + evt.date.getDate( ) + monthName;
	constants.dateLabel.text = dateContent;
	constants.dateShadowLabel.text = dateContent;

	let stepText = "";
	for( let i = ( "" + today.adjusted.steps ).length; i < 8; i++ )
		stepText += " ";
	stepText += today.adjusted.steps;
	constants.stepLabel.text = stepText;

	let timeContent = "";
	if( isAmPm ) {
		timeContent = ( ( evt.date.getHours( ) < 12 ) ? ( ( evt.date.getHours( ) === 0 ) ? 12 : evt.date.getHours( ) + "" ) : ( ( evt.date.getHours( ) % 12 === 0 ) ? 12 : ( evt.date.getHours( ) % 12 ) + "" ) ) + ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + ( isDisplayingSeconds ? ( ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getSeconds( ) < 10 ? ( "0" + evt.date.getSeconds( ) ) : evt.date.getSeconds( ) ) ) : "" ) + " " + ( isDisplayingSeconds ? "" : ( ( evt.date.getHours( ) < 12 ) ? "am" : "pm" ) );
	} else {
		timeContent = evt.date.getHours( ) + ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + ( isDisplayingSeconds ? ( ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getSeconds( ) < 10 ? ( "0" + evt.date.getSeconds( ) ) : evt.date.getSeconds( ) ) ) : "" );
	}
	constants.timeLabel.text = timeContent;
	constants.timeShadowLabel.text = timeContent;

	let totalSecondPassedToday = ( evt.date.getHours( ) * 3600 ) + ( evt.date.getMinutes( ) * 60 ) + evt.date.getSeconds( );
	constants.clockHand.groupTransform.rotate.angle = ( totalSecondPassedToday / 86400 ) * 180;

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
		fillColor += ( value.length === 1 ? "0" : "" ) + value;
	});
	constants.energyBar.style.fill = fillColor;

	if (HeartRateSensor) {
		setTimeout(function() {
			currentHeartBeat = ( currentHeartBeat + 1 ) % constants.heartAnimationArray.length;
			constants.heartAnimationArray[currentHeartBeat].animate("enable");
		}, 1000);
	}
};
