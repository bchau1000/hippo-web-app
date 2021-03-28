const express = require('express');
const cors = require('cors');
const pool = require('./config');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = 9000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());
app.use(app.router);
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello world!');
})

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////GET USER FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

app.post('/api/users', (request, response) => {
    console.log(request.body);
    try{
         pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
     
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    }
    catch(err){
        if (err.code === 'ER_DUP_ENTRY') 
            response.status(400).send(`User name already taken`);
        
    }
    
});

app.get('/api/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM users WHERE user_id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////LOGIN FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})