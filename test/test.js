var jsdom = require('jsdom').jsdom;
var doc = jsdom();

console.log(doc.createElement('table'));