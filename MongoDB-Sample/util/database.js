const MongoClient = require('mongodb').MongoClient;

let _db = null;

async function DbConnect() {
  try {
    let url =
      'mongodb+srv://admin:Windows.2000@cluster0.xwfguxf.mongodb.net/mysampledb?retryWrites=true&w=majority';
    let _db = await MongoClient.connect(url);
  } catch (e) {
    return e;
  }
}

async function Get() {
  try {

    if (db != null) {
      return db;
    } else {
      db = await DbConnect();
      return db;
    }
  } catch (e) {
    return e;
  }
}


exports.DbConnect = DbConnect;
exports.GetDbConnection = Get;
