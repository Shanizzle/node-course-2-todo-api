const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

//Use post http method to create new resources(todo) and you send that resource as a body

app.post('/todos', (req, res) => {
 let todo = new Todo({
   text: req.body.text
});

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET - use to read resources

app.listen(3000, () => {
  console.log('Started on port 3000');
});