var makeWidget = require('./lib/');
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('test/example1.json', { encoding: 'utf8' }));

console.log(makeWidget(obj));