// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// in v3 Mongo, db above would change to client
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected MongoDB Server');

  // db.collection('Todos').insertOne({
  //   //  in Mongo v3 you would add the below line:
  //   // const db = client.db('TodoApp');
  //     text: 'Something to do',
  //     completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });

  // db.collection('Users').insertOne({
  //   name: 'Shannen',
  //   age: 41,
  //   location: 'Houston'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert users, err');
  //   }
  //     console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
  // in Mongo v3 you would use client.close();
});
