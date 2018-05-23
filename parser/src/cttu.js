const { traverse, getType, getIdentifierName } = require('./ast');

function findCttu(ast) {
  let found = null;
  traverse(ast, node => {
    if (
      getType(node) === 'CallExpression' &&
      getType(node.callee) === 'MemberExpression' &&
      getType(node.callee.object) === 'MemberExpression' &&
      getIdentifierName(node.callee.object.object) === 'msg' &&
      getIdentifierName(node.callee.object.property) === 'sender' &&
      ['send', 'call'].includes(getIdentifierName(node.callee.property))
    ) {
      found = node;
    }
  });
  return found;
}

module.exports = {
  findCttu,
};
