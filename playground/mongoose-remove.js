const {ObjectID} = require('mongodb');


const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
// Todo.findOneAndRemove({_id '5aaff431c0dc1718ce848359'}).then((tod) => {
//
// });
Todo.findByIdAndRemove('5aaff431c0dc1718ce848359').then((todo) => {
  console.log(todo);
});
