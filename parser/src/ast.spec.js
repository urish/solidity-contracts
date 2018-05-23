const solparse = require('solparse');
const { traverse } = require('./ast');

describe('ast functions', () => {
  describe('traverse', () => {
    it('should traverse all the given AST nodes', () => {
      const ast = solparse.parse(`
        contract test {
            function getAddress(string32 _name) constant returns (address o_owner) {}
            function getName(address _owner) constant returns (string32 o_name) {}
        }       
      `);
      const nodes = [];
      traverse(ast, node => nodes.push(node.type));
      expect(nodes).toEqual([
        'Program',
        'ContractStatement',
        'FunctionDeclaration',
        'InformalParameter',
        'Type',
        'ModifierArgument',
        'ReturnParams',
        'InformalParameter',
        'Type',
        'BlockStatement',
        'FunctionDeclaration',
        'InformalParameter',
        'Type',
        'ModifierArgument',
        'ReturnParams',
        'InformalParameter',
        'Type',
        'BlockStatement',
      ]);
    });
  });
});
