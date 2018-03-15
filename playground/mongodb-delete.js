// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// in v3 Mongo, db above would change to client
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected MongoDB Server');

  //deleteMany
  // db.collection('Users').deleteMany({text: 'Exercise'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Shannen'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Exercise'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteOne({name: 'Shannen'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID("5aa844a35f3ae6b2c17162ff")}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // db.close();
  // in Mongo v3 you would use client.close();
});
