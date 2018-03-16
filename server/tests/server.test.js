const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then (() => done());
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

        Todo.find().then((todos) => { //making a request to the DB to verify our todo was added
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
      .expect(400).send(e)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch(e => done(e));
    });
  });
});
