/* eslint-disable react/no-multi-comp */
import DetectAdblock, { checkAttributes as attributes } from '../src/DetectAdblock';

describe('Detect adblock', () => {
  let adblockPresent;
  let detector;
  let clock;

  beforeEach(() => {
    console.log(window.document.getElementsByTagName('div'));

    clock = jest.useFakeTimers();

    adblockPresent = false;
    detector = new DetectAdblock(500, () => {
      console.log('DETECTED');
      adblockPresent = true;
    }, () => {
      console.log('NOT DETECTED');
      adblockPresent = false;
    });
  });

  afterEach(() => {
    clock.clearAllTimers();
  });

  test('should detect ads when adblock is enabled and adds attribute "abp" to body', () => {
    global.document.body.setAttribute('abp', 'true');
    detector.startChecking(5);
    clock.runTimersToTime(2000);
    expect(adblockPresent).toBe(true);
  });

  test('should detect ads when adblock is enabled and changes height/width of potential ads', () => {
    global.document.getElementsByClassName('pub300x250')[0].setAttribute('style', 'width: 0');
    detector.startChecking(5);
    clock.runTimersToTime(2000);
    expect(adblockPresent).toBe(true);
  });

  test('should detect ads when adblock is enabled and hides potential ads', () => {
    global.document.getElementsByClassName('pub728x90')[0].setAttribute('style', 'display:none');
    detector.startChecking(5);
    clock.runTimersToTime(2000);
    expect(adblockPresent).toBe(true);
  });

  // test('should not detect ads when adblock is not present', async (done) => {
  //   const y = await new Promise(resolve => {
  //     const x = new DetectAdblock(100, () => {
  //       resolve('bbbbb');
  //     }, () => {
  //       resolve('hahaha');
  //     });
  //     x.startChecking(1);
  //     // clock.runTimersToTime(2000);
  //   });

  //   expect(y).toBe('hahaha');
  //   done();
  // });
});

describe('DetectAttributes', () => {
  const bait = {
    offsetParent: 30,
    offsetHeight: 10,
    offsetLeft: 30,
    offsetTop: 100,
    offsetWidth: 50,
    clientHeight: 100,
    clientWidth: 100,
  };

  test('should not detect adblock when element attributes are not changed', () => {
    const result = DetectAdblock.checkAttributes(attributes, bait);
    expect(result).toBe(false);
  });

  test('should detect adblock when clientHeight is set to null', () => {
    const clientHeightBait = { ...bait, clientHeight: null };
    const result = DetectAdblock.checkAttributes(attributes, clientHeightBait);
    expect(result).toBe(true);
  });

  test('should not detect adblock when clientWidth is undefined', () => {
    const clientWidthBait = { ...bait, clientWidth: undefined };
    const result = DetectAdblock.checkAttributes(attributes, clientWidthBait);
    expect(result).toBe(false);
  });

  test('should detect adblock when clientWidth is 0', () => {
    const offsetParentBait = { ...bait, clientWidth: 0 };
    const result = DetectAdblock.checkAttributes(attributes, offsetParentBait);
    expect(result).toBe(true);
  });
});
