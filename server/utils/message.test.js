var expect = require('expect');

var { generateMessage, generateLocationMessage  } = require('./message')

describe('generateMessage', () => {
  it('Deberia generar el objeto del mensaje', () => {
    var from = 'Jen';
    var text = 'Algun mensaje';
    var mensaje = generateMessage(from, text);

    expect(mensaje.createdAt).toBeA('number');
    expect(mensaje).toInclude({ from, text });
  })
});

describe('generateLocationMessage', () => {
  it('Deberia generar correctamente el objeto de la locación', () => {
    var from = 'Santiago'
    var latitude = 4.5;
    var longitude = -75.2;
    var url = 'https://www.google.com/maps?q=4.5,-75.2';
    var mensaje = generateLocationMessage(from, latitude, longitude);

    expect(mensaje.createdAt).toBeA('number');
    expect(mensaje).toInclude({ from, text });
  })
})
