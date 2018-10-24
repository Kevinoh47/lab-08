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

    if (!validateString(firstname)) {
      throw 'Invalid first name.';
    }
    if (!validateString(lastname)) {
      throw 'Invalid last name.';
    }  
    if (!validateEmail(email)) {
      throw 'Invalid email.';
    }
    if (!validateRole(role)) {
      throw 'Invalid role.';
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

//regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript#46181
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateString(str) {
  if (typeof str !== 'string' || str.length < 2 || str.length > 50) return false;
  return true;
}

function validateRole(role) {
  if (role !== 'user' && role !=='editor' && role !== 'admin') return false;
  return true;
}

export default Users;
