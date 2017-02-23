# Detect AdBlock

```
yarn add @blueberry/4finance-detect-adblock
```

#detect-adblock

#Motivation

There aren't any simple libraries which check if a user has an ad block enabled. And that's what detect-adblock does.

#How to use

To use Detect AdBlock you need just to import `DetectAdblock` class to your project and then use it as a standard javascript class.

##Constructor
* `timeout` specifies number of `ms` to run check for, default is 1000.
* `enabledHandler` is a callback which is called when no ad block is recognized.
* `disabledHandler` is a callback which is called when no ad block is not recognized.
##Methods
* `startChecking(count)` is a method which starts checking for ad blockers. Count is the number of checks in one run. Default is 5.

#Example

```js
import DetectAdblock from '@blueberry/detect-adblock'

const onEnabled = () => console.log('ENABLED');
const onDisabled = () => console.log('DISABLED');

const check = () => {
  if (!process.env.IS_BROWSER) return;

  const detector = new DetectAdblock(500, onEnabled, onDisabled);
  detector.startChecking(3);
  return;
};
```

#Browser compatibility
The package should work in all modern browsers including IE8+.
