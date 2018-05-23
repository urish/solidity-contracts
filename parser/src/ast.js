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

module.exports = {
  traverse,
};
