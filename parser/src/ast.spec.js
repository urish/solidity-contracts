const solparse = require('solparse');
const { getIdentifierName, getType, traverse } = require('./ast');

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

  describe('getType', () => {
    it('should return the type of the given node', () => {
      expect(getType({ type: 'CallExpression' })).toEqual('CallExpression');
    });

    it('should return undefined if given undefined', () => {
      expect(getType()).toBeUndefined();
    });
  });

  describe('getIdentifierName', () => {
    it('should return the type of the given node if it is an identifier', () => {
      expect(getIdentifierName({ type: 'Identifier', name: 'msg' })).toEqual(
        'msg',
      );
    });

    it('should return null if the given node is not an identifier', () => {
      expect(
        getIdentifierName({ type: 'CallExpression', name: 'msg' }),
      ).toBeNull();
    });

    it('should return null if given undefined', () => {
      expect(getIdentifierName()).toBeNull();
    });
  });
});
