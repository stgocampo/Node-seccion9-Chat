const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('Deberia rechazar los valores que no son string', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  it('Deberia rechazar los string solo con espacios', () => {
    var res = isRealString('       ');
    expect(res).toBe(false);
  });

  it('Deberia aceptar los string con no-space caracteres', () => {
    var res = isRealString('    Santi     ');
    expect(res).toBe(true);
  });
});
