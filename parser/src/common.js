const fs = require('fs');
const path = require('path');
const CONTRACTS_DIR = '../../contracts';
const AST_DIR = '../../ast';

function* getContractFiles() {
  for (const name of fs.readdirSync(CONTRACTS_DIR)) {
    if (name.endsWith('.sol')) {
      yield path.join(CONTRACTS_DIR, name);
    }
  }
}

function getContracts() {
  for (const file of getContractFiles()) {
    return {
      file,
      content: fs.readFileSync(file),
    };
  }
}

function* getAsts() {
  for (const name of fs.readdirSync(AST_DIR)) {
    if (name.endsWith('.json')) {
      const file = path.join(AST_DIR, name);
      yield {
        file,
        ast: JSON.parse(fs.readFileSync(file, 'utf-8')),
      };
    }
  }
}

module.exports = {
  AST_DIR,
  CONTRACTS_DIR,
  getAsts,
  getContractFiles,
  getContracts,
};
