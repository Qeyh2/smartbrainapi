const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'faceproject'
  }
});
const app = express();
const database = {
     users: [
          {
               id:'123',
               name: 'Jhon',
               password: 'cookies',
               email: 'jhon@gmail.com',
               entries: 0,
               joined: new Date()
          },
          {
               id:'124',
               name: 'Dary',
               password: 'bananas',
               email: 'dary@gmail.com',
               entries: 0,
               joined: new Date()
          }
     ],
     login: [
          {
               id: '987',
               hash: '',
               email: 'john@gmail.com'
          }
     ]
}
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=> { res.send(database.users) })
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=> {
     console.log('app is running on port 3000');
})