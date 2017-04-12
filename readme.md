# Detect AdBlock

```
yarn add detect-adblock
```

DetectAdbblock is a library which recognizes using of ad blocker in a browser. You can use it in case you want to show advertisment towards users or just run important script which are beign blocked.

#Motivation

This library is inspired by [BlockAdBlock project](https://github.com/sitexw/BlockAdBlock). Main changes are that this library is simplified, completely written in ES6 and contains tests written in Jest.

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
  // It is important to check wheter the script is rendered in the browser.
  if (!process.env.IS_BROWSER) return;

  const detector = new DetectAdblock(500, onEnabled, onDisabled);
  detector.startChecking(3);
  return;
};
```

#Browser compatibility
The package should work in all modern browsers including IE8+.

## Made with love by
[![](https://camo.githubusercontent.com/d88ee6842f3ff2be96d11488aa0d878793aa67cd/68747470733a2f2f7777772e676f6f676c652e636f6d2f612f626c75656265727279617070732e636f6d2f696d616765732f6c6f676f2e676966)](https://www.blueberry.io)
