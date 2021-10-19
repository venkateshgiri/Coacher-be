const app = require('express')();
const atob = require('atob');

const { loginUser, createUser } = require('../actions').users;
app.post('/login', async (request, response) => {
 try {
   const { email, password } = request.body;
   const user = await loginUser(email, password);
   response.status(200).send(user);
 } catch (err) {
   console.log('err', err);
   response.status(400).json({ message: 'User credentials are not valid'});
 }
});

app.post('/', async (request, response) => {
  try {
   const userRecord = request.body;
   console.log('userRecord', userRecord);
   const savedUserRecord = await createUser(userRecord);
   console.log('savedUserRecord', savedUserRecord);
   response.status(200).send(savedUserRecord);
  } catch (err) {
    console.log('error', err);
    response.status(500).send(err)
  }
})

module.exports = app;
