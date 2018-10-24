'use strict';

import storage from '../lib/storage/memory.js';
// import storage from 'fileStorage';
// import storage from 'mongostuff';


class Users {
  constructor (_id, firstname, lastname, email, role) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }

  static findOne(id) {
    let query = { _id:id };
    return this.find(query);
  }

  static find(query) {
    return storage.find(query);
  }

  static save(data) {
    return storage.save(data);
  }

  static delete(id) {
    return storage.delete(id);
  }

  static put(id, data) {
    return storage.save(data);
  }

  static patch(id, data) {
    data._id = id;
    return storage.save(data);
  }

}

export default Users;
