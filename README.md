# Stardew valley clock face

## Do not forget

### Regenerate fit font characters:

```bash
npx fitfont-generate SVBold-inner.ttf 35 "1234567890 "
mv resources/SVBold_Inner_35/ff resources/SVNumber/
npx fitfont-generate SVThin.ttf 35 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: /"
npx fitfont-generate SVThin.ttf 42 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: /"
```

### Animation

This [topic](https://community.fitbit.com/t5/SDK-Development/Animate-FROM-TO-properties/td-p/2792974) saved me.

## Notes

- The seconds option disables am/pm display when selected (if time mode set to 12 hours).
- Scrolling formula looks like [this](http://www.iquilezles.org/apps/graphtoy/?f1(x)=sin(x*16)&f2(x)=sin(x*4))
- Ducks are sleeping between 8pm to 7am.

## Change log

### v1.0.9: Initial release

### v1.0.10: Heart rate update

- Added heart rate monitor 
- Added seconds display via settings option

### v1.0.11:

- Correct season and heart icon position/size
- Added south hemisphere option
- Now using clock parameters embedded am/pm on/off toggle as fitbit one is hided in website settings
- Added option to display month into date label
- Little ducks moving on map
- Map scrolling
- Added night mask

### v1.0.12:

- Added support for ionic (higgs) and versa lite (gemini)

### v1.0.13

- Added support for versa 2 (mira)
- Added new option to deactivate scrolling of the background map

## Contributors

- Maksi Lucy Bähr: Requested heart rate and possibility to display seconds (switchable in settings)
- Brooke Stehn: Requested south hemisphere seasons switch
- Saymawa (reddit): Wanted to install it on ionic
- Hannah and Caroline: Requested support for versa 2

## Author

SOARES Lucas <lucas.soares.npro@gmail.com> (u/nprojectn)

https://gitlab.com/nlucassoares/clock
