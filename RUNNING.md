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

1. Go through the [Fitbit Developer Getting Started](https://dev.fitbit.com/getting-started/) to make sure you’re set up to develop.

## Try to build and install the project!

```
npx fitbit-build
npx fitbit
fitbit$ install
```

You can also rebuild from within the Fitbit shell:

```
fitbit$ build
````

To save time when you're using the Fitbit shell, you can run the single command build-and-install or bi for short.

```
fitbit$ bi
```




## Things not to forget!

### Fitbit Developer Command Line Interface Guide

[Fitbit Developer Command Line Interface Guide](https://dev.fitbit.com/build/guides/command-line-interface/)

### Regenerate fit font characters:

```bash
npx fitfont-generate SVBold-inner.ttf 35 "1234567890 "
mv resources/SVBold_Inner_35/ff resources/SVNumber/
npx fitfont-generate SVThin.ttf 35 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: %/"
npx fitfont-generate SVThin.ttf 42 "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn.1234567890: /"
```

### Animation

This [topic](https://community.fitbit.com/t5/SDK-Development/Animate-FROM-TO-properties/td-p/2792974) saved me.
