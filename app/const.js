import clock from "clock";

import { FitFont } from 'fitfont';

clock.granularity = "seconds";

export const WeekDay = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

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
