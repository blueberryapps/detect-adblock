import { jsdom } from 'jsdom';

process.env.IS_BROWSER = true;

const documentHTML = '<!doctype html><html><head></head><body><div id="page">Page</div></body></html>';
global.document = jsdom(documentHTML);
global.window = document.defaultView;

// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

// global.navigator = {
//   userAgent: 'node.js'
// };

// console.log('object keys', Object.keys(document.defaultView));
// console.log('object keys', global.document.body.innerHTML);


// window.document = jsdom('<html><body><div id="page">Page</div></body></html>');
//window = document.defaultView;

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get: function() { return parseFloat(window.getComputedStyle(this).marginLeft) || 0; }
  },
  offsetTop: {
    get: function() { return parseFloat(window.getComputedStyle(this).marginTop) || 0; }
  },
  offsetHeight: {
    get: function() { return parseFloat(window.getComputedStyle(this).height) || 0; }
  },
  offsetWidth: {
    get: function() { return parseFloat(window.getComputedStyle(this).width) || 0; }
  }
});
