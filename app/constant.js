import clock from "clock";
import document from "document";
import { FitFont } from 'fitfont';

// update every second
clock.granularity = "seconds";

// week day names (shorted, three letters)
export const WeekDay = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

// water frame count
export const WaterFrameCount = 4;

// fitfont dynamic labels
export const dateLabel = new FitFont(
    { 
        id:'date',
        font:'SVThin_42',

        halign: 'start',
        valign: 'baseline',
        letterspacing: 0
    }
);
  
export const dateShadowLabel = new FitFont(
    { 
        id:'dateShadow',
        font:'SVThin_42',

        halign: 'start',
        valign: 'baseline',
        letterspacing: 0
    }
);
  
export const timeLabel = new FitFont(
    { 
        id:'time',
        font:'SVThin_42',

        halign: 'start',
        valign: 'baseline',
        letterspacing: 0
    }
);

export const timeShadowLabel = new FitFont(
    { 
        id:'timeShadow',
        font:'SVThin_42',

        halign: 'start',
        valign: 'baseline',
        letterspacing: 0
    }
);

export const stepLabel = new FitFont(
    { 
        id:'goldText',
        font:'SVNumber',

        halign: 'start',
        valign: 'baseline',
        letterspacing: 4
    }
);

export const root = document.getElementById( "root" );

export const clockElement= document.getElementById( "clockElement" );

// clock hand for rotation according to time of the day (86400 seconds ratio <=> 0 to 180 degrees angle)
export const clockHand = document.getElementById( "clockHand" );

export const water = document.getElementById( "water" );
export const map = document.getElementById( "map" );
export const season = document.getElementById( "season" );

export const energyBarLength = 198;
export const energyBar = document.getElementById( "energyBarContent" );
export const energyBarContainer = document.getElementById( "energyBar" );