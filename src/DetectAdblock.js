export const checkAttributes = ['offsetParent', 'offsetHeight', 'offsetLeft', 'offsetTop', 'offsetWidth', 'clientHeight', 'clientWidth'];

const baitClass = 'pub300x250 pub300x250m pub728x90 text-ad textAd textad textads text-ads text-ad-links';
const baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;';
const defaultCount = 5;
const defaultHandler = () => {};
const defaultTimeout = 1000;

export default class DetectAdblock {
  constructor(timeout = defaultTimeout, enabledHandler = defaultHandler, disabledHandler = defaultHandler) {
    this.onEnabled = enabledHandler;
    this.onDisabled = disabledHandler;
    this.timeout = timeout;
    this._insertAd();
  }

  startChecking(count = defaultCount) {
    if (!process.env.IS_BROWSER) {
      return;
    }
    const check = this._check();

    if (check) {
      this.onEnabled();
    } else {
      this.onDisabled();
    }

    if (count > 0) {
      this._timeoutIdentifier = setTimeout(() => this.startChecking(count - 1), this.timeout);
    } else {
      this._removeAd();
    }
  }

  destroy() {
    this._removeAd();
  }

  static checkAttributes = (attributes, bait) =>
    attributes.reduce((prev, cur) =>
      prev || ((bait[cur] === undefined) ? false : !bait[cur]),
    false);

  _check() {

    if (!this._bait) {
      this._insertAd();
    }

    if (window.document.body.getAttribute('abp') ||
      DetectAdblock.checkAttributes(checkAttributes, this._bait)) {
      return true;
    }

    if (window.getComputedStyle !== undefined) {
      const baitTemp = window.getComputedStyle(this._bait, null);
      if (baitTemp && (baitTemp.getPropertyValue('display') === 'none' ||
          baitTemp.getPropertyValue('visibility') === 'hidden')) {
        return true;
      }
    }

    return false;
  }

  _insertAd() {
    if (!process.env.IS_BROWSER) {
      return;
    }
    if (this._bait) {
      return;
    }

    const bait = window.document.createElement('div');
    bait.setAttribute('class', baitClass);
    bait.setAttribute('style', baitStyle);
    const insertionPlace = window.document.getElementById('page');
    insertionPlace.parentNode.insertBefore(bait, insertionPlace);
    this._bait = window.document.getElementsByClassName('pub300x250')[0];
  }

  _removeAd() {
    if (this._timeoutIdentifier) {
      clearTimeout(this._timeoutIdentifier);
    }
    if (!process.env.IS_BROWSER) {
      return;
    }
    window.document.body.removeChild(this._bait);
    this._bait = null;
  }
}
