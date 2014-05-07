var Syntax = require('esprima-fb').Syntax;
var util = require('jstransform/src/utils');

module.exports = {
    visitorList: [visitString]
};

function visitString(traverse, node, path, state) {
    var val = node.value.replace(/World/, 'JSTransform');
    util.catchup(node.range[0], state);
    util.append(JSON.stringify(val), state);
    util.move(node.range[1], state);
    return false;
}

visitString.test = function(node) {
    return node.type === Syntax.Literal
        && typeof node.value === 'string';
};
