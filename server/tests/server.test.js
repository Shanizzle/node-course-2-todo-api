const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

  const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }];

  beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  });

  // test case - using Mocha
  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      let text = 'Test todo text';

      //using supertest
      request(app)
      .post('/todos')
      .send({text})
      .expect(200)  //assertions
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {  //passing in res to see what was sent to the DB
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => { //making a request to the DB to verify our todo was added
          expect(todos.length).toBe(1); //assertions
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
    });
// test to verify todo does not get created when we send bad data
    it('Should not create todo with invalid body data', (done) => {
      request(app)
      .post('/todos')
      .send({}) // intentionally sending bad data to test
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
    });
  });

    describe('GET /todos/:id', () => {
      it('should return todo doc', (done) => {
        request(app) //supertest
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
          })
          .end(done);
      });
      it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
        });

      it('should return 404 for non-object ids', (done) => {
        request(app)
          .get('/todos/123abc')
          .expect(404)
          .end(done);
    });
});

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      let hexId = todos[1]._id.toHexString();
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            Todo.findById(hexId).then((todo) => {
              expect(todo).toBeFalsy();
              done();
            }).catch((e) => done(e));
          });
    });
    it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object ID is invalid', (done) => {
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
  });
});

  describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      let hexId = todos[0]._id.toHexString();
      let text = 'Testing if update works';
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: true,
            text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);

    });
    it('should clear completedAt when todo is not completed', (done) => {

    let hexId = todos[1]._id.toHexString();
    let text = 'Testing if update works';
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
      });
  });
