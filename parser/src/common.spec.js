const { getLineAndOffset } = require('./common');

describe('common', () => {
  describe('getLineAndOffset', () => {
    it('should return the correct line and offset for a given source code position', () => {
      expect(getLineAndOffset(`line 1\nline 2\nline 3`, 12)).toEqual({
        line: 2,
        offset: 6,
      });
    });
  });
});
