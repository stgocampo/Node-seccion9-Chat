const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users = new Users();
  beforeEach(() => {
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      }, {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      }, {
        id: '3',
        name: 'Jude',
        room: 'Node Course'
      }]
  });

  it('Deberia agregar un nuevo usuario', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Santi',
      room: 'casa'
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('Debería eliminar un usuario', () => {
    var userId = '3';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('No debería eliminar un usuario', () => {
    var userId = '4';
    var user = users.removeUser(userId);

    expect(user).toEqual(undefined);
    expect(users.users.length).toBe(3);
  });

  it('Debería encontrar un usuario', () => {
    var userId = '3'
    var user = users.getUser(userId);

    expect(user.id).toEqual(userId);
  });

  it('No debería encontrar un usuario', () => {
    var userId = '4'
    var user = users.getUser(userId);
    expect(user).toEqual(undefined);
  });

  it('Deberia retornar los usuarios del curso node', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Jude']);
  });

  it('Deberia retornar los usuarios del curso react', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  })
  // it('Deberia rechazar los string solo con espacios', () => {
  //   var res = isRealString('       ');
  //   expect(res).toBe(false);
  // });
  //
  // it('Deberia aceptar los string con no-space caracteres', () => {
  //   var res = isRealString('    Santi     ');
  //   expect(res).toBe(true);
  // });
});
