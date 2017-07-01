import { JSDOM } from 'jsdom'; // eslint-disable-line import/no-extraneous-dependencies
import { attributes } from './src/DetectAdblock';

process.env.IS_BROWSER = true;

const documentHTML = '<!doctype html><html><head></head><body><div id="page">Page</div></body></html>';
const dom = new JSDOM(documentHTML);

global.document = dom;
global.window = document.defaultView;

const checkHeight = (ctx) => {
  const height = window.getComputedStyle(ctx).height;
  return height === null || typeof height === 'undefined' || height !== '0px';
};

const checkWidth = (ctx) => {
  const width = window.getComputedStyle(ctx).width;
  return width === null || typeof width === 'undefined' || width !== '0px';
};

const checkDisplay = (ctx) => {
  const display = window.getComputedStyle(ctx).display;
  return display === null || typeof display === 'undefined' || display !== 'none';
};

const attributesMappings = {
  clientHeight: checkHeight,
  clientWidth: checkWidth,
  offsetHeight: checkHeight,
  offsetLeft: checkWidth,
  offsetParent: checkDisplay,
  offsetTop: checkHeight,
  offsetWidth: checkWidth,
};

const properties = attributes.reduce((prev, cur) =>
  ({
    ...prev,
    [cur]: {
      get: function get() {
        return attributesMappings[cur](this);
      },
      configurable: true,
    }
  })
, {});

Object.defineProperties(window.HTMLDivElement.prototype, properties);
Object.defineProperties(window.HTMLBodyElement.prototype, properties);
