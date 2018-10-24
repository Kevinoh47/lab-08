'use strict';

import storage from '../lib/storage/memory.js';
// import storage from 'fileStorage';
// import storage from 'mongostuff';


class Users {
  
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

  static validateUser(data) {
    let _id = data._id;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let email = data.email;
    let role = data.role;

    if (typeof firstname !== 'string') {
      throw 'First name must be a string';
    }  
    if (firstname.length < 2 || firstname.length > 30) {
      throw 'Name must be 2-30 characters long.';
    }

    if (typeof lastname !== 'string') {
      throw 'Last name must be a string';
    }  
    if (lastname.length < 2 || lastname.length > 40) {
      throw 'Name must be 2-40 characters long.';
    }

    if (typeof email !== 'string') {
      throw 'email must be a string';
    }  
    if (email.length < 2 || !email.includes('@')) {
      throw 'Email must be at least 2 characters long and it must contain the @ sign.';
    }

    if (role !== 'user' && role !=='editor' && role !== 'admin') {
      throw 'Role must be a user, editor, or admin.';
    }
    // case new save
    let validatedUser = {firstname:firstname, lastname:lastname, email:email, role:role};
    // case update save
    if (_id) {
      validatedUser._id=_id;
    }
    return Promise.resolve(validatedUser);
  }

}

export default Users;
