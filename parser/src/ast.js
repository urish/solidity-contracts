function traverse(ast, callback) {
  if (ast instanceof Array) {
    ast.forEach(item => traverse(item, callback));
    return;
  }
  if (ast && typeof ast === 'object') {
    if (typeof ast.type === 'string') {
      callback(ast);
    }
    for (const key of Object.keys(ast)) {
      traverse(ast[key], callback);
    }
  }
}

function getType(node) {
  return node && node.type;
}

function getIdentifierName(node) {
  return getType(node) === 'Identifier' ? node.name : null;
}

module.exports = {
  traverse,
  getType,
  getIdentifierName,
};
