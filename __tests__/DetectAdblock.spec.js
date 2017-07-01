/* eslint-disable react/no-multi-comp */
import DetectAdblock, { attributes } from '../src/DetectAdblock';

const startTest = callback =>
  new Promise((resolve) => {
    const x = new DetectAdblock(500, () => {
      resolve(true);
    }, () => {
      resolve(false);
    });
    if (callback) callback();
    x.startChecking(1);
  });

describe('Detect adblock', () => {
  afterEach(() => {
    global.document.body.removeAttribute('abp');
    global.document.getElementsByClassName('pub728x90')[0].removeAttribute('style');
    global.document.getElementsByClassName('pub728x90')[0].removeAttribute('class');
  });

  test('should detect ads when adblock is enabled and adds attribute "abp" to body', () => {
    const changeSource = () => global.document.body.setAttribute('abp', 'true');
    return startTest(changeSource).then(result => expect(result).toBe(true));
  });

  test('should detect ads when adblock is enabled and changes height/width of potential ads', () => {
    const changeSource = () => {
      document.getElementsByClassName('pub300x250')[0].style.width = '0';
    };
    return startTest(changeSource).then(result => expect(result).toBe(true));
  });

  test('should detect ads when adblock is enabled and hides potential ads', () => {
    const changeSource = () => {
      document.getElementsByClassName('pub728x90')[0].style.display = 'none';
    };
    return startTest(changeSource).then(result => expect(result).toBe(true));
  });

  test('should not detect ads when adblock is not present', () =>
    startTest().then(result => expect(result).toBe(false))
  );
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
