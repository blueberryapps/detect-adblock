import { jsdom } from 'jsdom';

process.env.IS_BROWSER = true;

const documentHTML = '<!doctype html><html><body><div id="page">Page</div></body></html>';
global.document = jsdom(documentHTML);
global.window = document.defaultView;
