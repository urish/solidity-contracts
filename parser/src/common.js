const fs = require('fs');
const path = require('path');
const solparse = require('solparse');
const AST_DIR = path.join(__dirname, '../../ast');
const CONTRACTS_DIR = path.join(__dirname, '../../contracts');

if (!fs.existsSync(AST_DIR)) {
  fs.mkdirSync(AST_DIR);
}

function* getContractFiles() {
  for (const name of fs.readdirSync(CONTRACTS_DIR)) {
    if (name.endsWith('.sol')) {
      yield path.join(CONTRACTS_DIR, name);
    }
  }
}

function getCacheFileName(contractFile) {
  return path.join(AST_DIR, path.basename(contractFile) + '.json');
}

function getContracts() {
  for (const file of getContractFiles()) {
    return {
      file,
      content: fs.readFileSync(file),
    };
  }
}

function getAstFor(file, onError = () => null) {
  const cacheFile = getCacheFileName(file);
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  }
  try {
    const ast = solparse.parseFile(file);
    fs.writeFileSync(cacheFile, JSON.stringify(ast));
    return ast;
  } catch (err) {
    onError(file, err);
  }
}

function* getAsts(onError = () => null) {
  for (const file of getContractFiles()) {
    yield {
      file,
      content: fs.readFileSync(file, 'utf-8'),
      ast: getAstFor(file, onError),
    };
  }
}

function getLineAndOffset(sourceCode, pos) {
  const contentBefore = sourceCode.substr(0, pos);
  const linesBefore = contentBefore.split('\n');
  return {
    line: linesBefore.length,
    offset: linesBefore[linesBefore.length - 1].length + 1,
  };
}

module.exports = {
  AST_DIR,
  CONTRACTS_DIR,
  getAstFor,
  getAsts,
  getContractFiles,
  getContracts,
  getLineAndOffset,
};
