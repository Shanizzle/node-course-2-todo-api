const {ObjectID} = require('mongodb');


const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5aaac8c44ef329f3a1389dd7';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

//Queries

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// });
//
// //use this to search if you don't know the id
// Todo.findOne({
//   _id: id //change criteria to something other than id of course
// }).then((todo) => {
// console.log('Todo', todo)
// });

//use the below to search if you know the id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));


User.findById(id).then((user) => {
  if (!user) {
    return console.log('No User found');
  }
  console.log('User found', user);
}).catch((e) => console.log(e));
