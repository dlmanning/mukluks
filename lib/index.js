var templates = require('./templates');

function makeWidget (scaffold) {
  var context = {};
  var partials = {};

  var val, partial = "";

  var template = getTemplateFunc(scaffold.type, templates);

  for (var key in scaffold) {
    if (scaffold.hasOwnProperty(key)) {
      val = scaffold[key];
      if (Array.isArray(val)) {
        val.forEach(function (item) {
          if (typeof item === 'object') {
            partial += makeWidget(item);
          }
          else if (typeof item === 'string' || typeof item === 'number') {
            context[key] = context[key] || [];
            context[key].push(item);
          }
        });
        partials[key] = partial;
        partial = "";
      } 
      else if (typeof val === 'object') {
        partials[key] = makeWidget(val);
      } 
      else if (isValidData(val)) {
        context[key] = val;
      }
    }
  }

  return template(context, {partials: partials});
}

function isValidData (thing) {
  return (typeof thing === 'string' || 
          typeof thing === 'number' ||
          typeof thing === 'boolean');
}

function getTemplateFunc (name, templates) {

  var tempFunc = undefined;

  Object.keys(templates).forEach(function (key) {
    if (key === name) {
      tempFunc = templates[key];
    } else if (typeof templates[key] === 'object') {
      tempFunc = getTemplateFunc(name, templates[key]);
    }
  });

  return tempFunc;
}

module.exports = makeWidget;
