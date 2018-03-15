// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
// in v3 Mongo, db above would change to client
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected MongoDB Server');

// findOneAndUpdate(filter, update, options) - all params are objects
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5aaa9318c0dc1718ce83a6a5')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Mike',
    age: 41
  }, {
    $set: {
      name: 'Shannen'
    },
    $inc: {
      age: +1
    }
  }, {
    returnOriginal: false
  }).then((result)  => {
    console.log(result);
  });
  // db.close();
  // in Mongo v3 you would use client.close();
});
