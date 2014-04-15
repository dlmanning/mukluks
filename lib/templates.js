var fs = require('fs');
var path = require('path');

var Handlebars = require('handlebars');

var extension = '.hbs'

module.exports = getTemplates('templates');

function getTemplates(directory) {
  var templates = {};

  fs.readdirSync(directory)
    .forEach(function (file) {
      var filepath = path.join(directory, file);
      var contents;

      if (fs.statSync(filepath).isDirectory()) {
        templates[path.basename(filepath)] = getTemplates(filepath);
      } else if (path.extname(file) === extension) {
        contents = fs.readFileSync(filepath, { encoding: 'utf8' });
        templates[path.basename(filepath, extension)] = Handlebars.compile(contents);
      }
    });

  return templates;
}