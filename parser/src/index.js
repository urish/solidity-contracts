const fs = require('fs');
const path = require('path');
const solparse = require('solparse');
const { getAsts, AST_DIR } = require('./common');

if (!fs.existsSync(AST_DIR)) {
  fs.mkdirSync(AST_DIR);
}

function errorHandler(file, error) {
  console.log('Error', file, error);
}

for (const file of getAsts(errorHandler)) {
  // iterating over the files is enough to generate the cache
}
