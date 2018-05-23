const { findCttu } = require('./cttu');
const solparse = require('solparse');

describe('findCttu', () => {
  it('should return the relevant AST node if we have a call to msg.sender.send', () => {
    const ast = solparse.parse(`
      contract test {
        function callToTheUnknown() {
          msg.sender.send(1);
        }
      }
    `);
    expect(findCttu(ast)).toMatchObject({
      type: 'CallExpression',
    });
  });

  it('should return null if we have a call to msg.sender.safeFunc', () => {
    const ast = solparse.parse(`
      contract test {
        function dontCallToTheUnknown() {
          msg.sender.safeFunc(1);
        }
      }
    `);
    expect(findCttu(ast)).toBe(null);
  });

  it('should return null if we have a call to unknown.sender.send', () => {
    const ast = solparse.parse(`
      contract test {
        function dontCallToTheUnknown() {
          unknown.sender.send(1);
        }
      }
    `);
    expect(findCttu(ast)).toBe(null);
  });
});
