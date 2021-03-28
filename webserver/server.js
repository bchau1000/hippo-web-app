const express = require('express');
const cors = require('cors');
const pool = require('./config');
const app = express();
const port = 9000;

//Middleware
app.use(express.urlencoded({ extended: true }));
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


app.post('/api/studyset', (request, response) => {
    console.log(request.body);
    try{
         pool.query('INSERT INTO studySets SET ?', request.body, (error, result) => {
            if (error) throw error;
     
            response.status(201).send(`Study set has been created: ${result.insertId}`);
        });
    }
    catch(err){
        console.log(err);
    }
    
});

app.get('/api/sets/:set_id', (request, response) => {
    const set_id = request.params.set_id;
 
    pool.query('SELECT setName,set_description FROM studySets WHERE set_id = ?', set_id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
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




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})