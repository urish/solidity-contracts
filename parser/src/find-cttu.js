const path = require('path');
const { getAsts, getLineAndOffset } = require('./common');
const { findCttu } = require('./cttu');

for (const { file, content, ast } of getAsts()) {
  const node = findCttu(ast);
  if (node) {
    const { line, offset } = getLineAndOffset(content, node.start);
    console.log(`${path.resolve(file)}:${line}:${offset}`);
  }
}
