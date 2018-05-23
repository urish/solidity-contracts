const fs = require('fs');
const path = require('path');
const solparse = require('solparse');
const { getContractFiles, AST_DIR } = require('./common');

if (!fs.existsSync(AST_DIR)) {
  fs.mkdirSync(AST_DIR);
}

for (const file of getContractFiles()) {
  try {
    const ast = solparse.parseFile(file);
    fs.writeFileSync(
      path.join(AST_DIR, path.basename(file) + '.json'),
      JSON.stringify(ast, null, 2),
    );
  } catch (err) {
    console.log('Error', file, err);
  }
}
