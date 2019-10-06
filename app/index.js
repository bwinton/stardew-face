import clock from "clock";
import * as messaging from "messaging";
import * as constants from "./constant";
import * as duck from "./duck";
import * as common from "../common/constant"
import { today } from "user-activity";
import { battery } from "power";
import { me as device } from "device";

import { calculateSeason, hslToRgb } from "../common/utils";

import { locale } from "user-settings";

import { HeartRateSensor } from "heart-rate";

const MaximumNightMaskOpacity = 0.5;

let currentWaterFrame = 0;
let currentHeartBeat = 1;
let currentDisplayMode = 0;

let isDisplayingSeconds = false;
let isSouthHemisphere = false;
let isAmPm = true;
let isDisplayingMonth = false;

// https://dev.fitbit.com/build/guides/multiple-devices/#code-detection
if (!device.screen) device.screen = { width: 348, height: 250 };

let duckArray = [
	new duck.Duck(0, constants.MapCollision),
	new duck.Duck(1, constants.MapCollision),
	new duck.Duck(2, constants.MapCollision),
	new duck.Duck(3, constants.MapCollision),
	new duck.Duck(4, constants.MapCollision),
	new duck.Duck(5, constants.MapCollision),
	new duck.Duck(6, constants.MapCollision),
	new duck.Duck(7, constants.MapCollision),
	new duck.Duck(8, constants.MapCollision),
	new duck.Duck(9, constants.MapCollision),
];

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
	}
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
	currentDisplayMode = ( currentDisplayMode + 1 ) % 3;

	switch( currentDisplayMode ) {
		default:
		case 0:
			constants.clockElement.style.visibility = "visible";
			constants.energyBarContainer.style.visibility = "hidden";
			break;
		case 1:
			constants.clockElement.style.visibility = "hidden";
			constants.energyBarContainer.style.visibility = "visible";
			break;
		case 2:
			constants.clockElement.style.visibility = "hidden";
			constants.energyBarContainer.style.visibility = "hidden";
			break;
	}
};

clock.ontick = (evt) => {
	// calculate season based on ticked date
	let currentSeason = calculateSeason( evt.date,
		isSouthHemisphere );

	// center clock component
	constants.clockElement.x = Math.ceil( ( device.screen.width / 2 ) - ( constants.clockElement.width / 2 ) );
	constants.clockElement.y = Math.ceil( ( device.screen.height / 2 ) - ( constants.clockElement.height / 2 ) );

	// set energy bar position
	constants.energyBarContainer.x = Math.ceil( device.screen.width - constants.energyBarContainer.width - 5 );
	constants.energyBarContainer.y = Math.ceil( ( device.screen.height / 2 ) - ( constants.energyBarContainer.height / 2 ) );

	// update map scrolling
	constants.mapBottom[ 0 ].x = constants.mapTop[ 0 ].x = -1 * Math.ceil( Math.abs( Math.sin( ( evt.date.getTime( ) / 2000000 ) * 16 ) ) * ( constants.MapBackgroundDimension.x - device.screen.width ) );
	constants.mapBottom[ 0 ].y = constants.mapTop[ 0 ].y = -1 * Math.ceil( Math.abs( Math.sin( ( evt.date.getTime( ) / 2000000 ) * 4 ) ) * ( constants.MapBackgroundDimension.y - device.screen.height ) );
	for( let i = 1; i < 3; i++ ) {
		constants.mapBottom[ i ].x = constants.mapTop[ i ].x = constants.mapBottom[ 0 ].x + i * 300;
		constants.mapBottom[ i ].y = constants.mapTop[ i ].y = constants.mapBottom[ 0 ].y;
	}
	constants.water.x = constants.mapBottom[ 0 ].x + 200;
	constants.water.y = constants.mapBottom[ 0 ].y + 240;

	// update ducks
	duckArray.forEach(element => {
		element.Update( evt.date,
			duckArray,
			constants.mapBottom[ 0 ],
		);
	});

	// update map background
	currentWaterFrame = ( ( currentWaterFrame + 1 ) % constants.WaterFrameCount );
	currentWaterFrame = currentWaterFrame === 0 ? 4 : currentWaterFrame;
	constants.water.href = "map/water" + currentWaterFrame + ".png";

	for( let i = 1; i <= 3; i++ ) {
		constants.mapBottom[ i - 1 ].href="map/" + currentSeason + "Bottom" + i + ".png";
		constants.mapTop[ i - 1 ].href="map/" + currentSeason + "Top" + i + ".png";
	}

	// update night mask
	let coefficient = 0;
	if( evt.date.getHours( ) > 19 ) {
		if( evt.date.getHours( ) < 22 ) {
			coefficient = ( ( ( evt.date.getHours( ) - 20 ) * 3600.0 + evt.date.getMinutes( ) * 60.0 + evt.date.getSeconds( ) ) / 7200.0 ) * MaximumNightMaskOpacity;
		} else {
			coefficient = MaximumNightMaskOpacity;
		}
	} else if( evt.date.getHours( ) < 7 ) {
		if( evt.date.getHours( ) > 4 ) {
			coefficient = ( ( 7200.0 - ( ( evt.date.getHours( ) - 5 ) * 3600.0 + evt.date.getMinutes( ) * 60.0 + evt.date.getSeconds( ) ) ) / 7200.0 ) * MaximumNightMaskOpacity;
		} else {
			coefficient = MaximumNightMaskOpacity;
		}
	}
	constants.nightMask.style.opacity = coefficient;

	// update season and date
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
	}
	let dateContent = day + ". " + evt.date.getDate( ) + monthName;
	constants.dateLabel.text = dateContent;
	constants.dateShadowLabel.text = dateContent;

	// update steps count
	let stepText = "";
	for( let i = ( "" + today.adjusted.steps ).length; i < 8; i++ )
		stepText += " ";
	stepText += today.adjusted.steps;
	constants.stepLabel.text = stepText;

	// update time
	let timeContent = "";
	if( isAmPm ) {
		timeContent = ( ( evt.date.getHours( ) < 12 ) ? ( ( evt.date.getHours( ) === 0 ) ? 12 : evt.date.getHours( ) + "" ) : ( ( evt.date.getHours( ) % 12 === 0 ) ? 12 : ( evt.date.getHours( ) % 12 ) + "" ) ) + ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + ( isDisplayingSeconds ? ( ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getSeconds( ) < 10 ? ( "0" + evt.date.getSeconds( ) ) : evt.date.getSeconds( ) ) ) : "" ) + " " + ( isDisplayingSeconds ? "" : ( ( evt.date.getHours( ) < 12 ) ? "am" : "pm" ) );
	} else {
		timeContent = evt.date.getHours( ) + ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getMinutes( ) < 10 ? ( "0" + evt.date.getMinutes( ) ) : evt.date.getMinutes( ) ) + ( isDisplayingSeconds ? ( ( evt.date.getSeconds( ) % 2 === 0 ? ":" : " " ) + ( evt.date.getSeconds( ) < 10 ? ( "0" + evt.date.getSeconds( ) ) : evt.date.getSeconds( ) ) ) : "" );
	}
	constants.timeLabel.text = timeContent;
	constants.timeShadowLabel.text = timeContent;

	// update clock hand
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

	// update heart rate
	if (HeartRateSensor) {
		setTimeout(function() {
			currentHeartBeat = ( currentHeartBeat + 1 ) % constants.heartAnimationArray.length;
			constants.heartAnimationArray[currentHeartBeat].animate("enable");
		}, 1000);
	}
};
