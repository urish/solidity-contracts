const fs = require('fs');
const path = require('path');
const solparse = require('solparse');
const CONTRACTS_DIR = '../contracts';
const AST_DIR = '../ast';

const contractFiles = fs
  .readdirSync(CONTRACTS_DIR)
  .filter(name => name.endsWith('.sol'))
  .map(file => path.join(CONTRACTS_DIR, file));

if (!fs.existsSync(AST_DIR)) {
  fs.mkdirSync(AST_DIR);
}

for (const file of contractFiles) {
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
