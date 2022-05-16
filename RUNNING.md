# How to get it running.

## Install Node v10.24.1

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
2. `nvm install 10.24.1`
3. `nvm use 10`

## Get the code.

`git clone https://github.com/bwinton/stardew-face.git`
`cd stardew-face`
`npm install`


## Make sure the Fitbit Developer Studio stuff is set up.

TBD.



## Things not to forget!

### Regenerate fit font characters:

```bash
npx fitfont-generate SVBold-inner.ttf 35 "1234567890 "
mv resources/SVBold_Inner_35/ff resources/SVNumber/
npx fitfont-generate SVThin.ttf 35 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: %/"
npx fitfont-generate SVThin.ttf 42 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: /"
```

### Animation

This [topic](https://community.fitbit.com/t5/SDK-Development/Animate-FROM-TO-properties/td-p/2792974) saved me.
