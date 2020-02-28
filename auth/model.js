const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy,
  clear
};

function add(user) {
  return db("users").insert(user);
};

function findBy(filter) {
    return db('users').where(filter);
};

function clear() {
  return db('users').del();
};