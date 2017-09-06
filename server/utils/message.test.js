var expect = require('expect');
var { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('Deberia generar el objeto del mensaje', () => {
    var from = 'Jen';
    var text = 'Algun mensaje';
    var mensaje = generateMessage(from, text);

    expect(mensaje.createdAt).toBeA('number');
    expect(mensaje).toInclude({ from, text });
  })
});
