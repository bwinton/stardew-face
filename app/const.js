import clock from "clock";
import document from "document";
import { FitFont } from 'fitfont';

// update every minute
clock.granularity = "minutes";

// week day names (shorted as in stardew valley, three letters)
export const WeekDay = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

// fitfont dynamic date labels
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

// clock hand for rotation according to time of the day (86400 seconds ratio <=> 0 to 180 degrees angle)
export const clockHand = document.getElementById( "clockHand" );
