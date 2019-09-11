// comes from https://stackoverflow.com/questions/57314902/javascript-calculate-season
export function calculateSeason(d) {
    let day = d;
    let days = day.getTime();

    const SPRING_START = new Date(day.getFullYear(), 2, (day.getFullYear() % 4 === 1) ? 19 : 20).getTime();
    const SUMMER_START = new Date(day.getFullYear(), 5, (day.getFullYear() % 4 === 1) ? 20 : 21).getTime();
    const AUTUMN_START = new Date(day.getFullYear(), 8, (day.getFullYear() % 4 === 1) ? 22 : 23).getTime();
    const AUTUMN_END = new Date(day.getFullYear(), 11, (day.getFullYear() % 4 === 1) ? 20 : 21).getTime();

    const s = [SPRING_START, SUMMER_START, AUTUMN_START, AUTUMN_END];
    const S_NAME = [ "spring", "summer", "fall", "winter" ];

    let season = "";

    for( let i = 0; i < s.length - 1; i++ ) {
        if(days >= s[i] && days < s[i + 1]) {
            season = S_NAME[i];
            break;
        } 
        season = S_NAME[3];
    }
    return season;
}

/**
 * From https://stackoverflow.com/a/9493060/9144761
 * 
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
