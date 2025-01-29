const client = require('./connection.js')
const express = require('express');

const app = express();


app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/users', async (req, res)=>{
    try{
        await client.query(`Select * from users`), 
        res.send(result.rows);   
    }catch (err){
        console.error(err.message)
    }finally{
        client.end;
    }
        }
    );
app.get('/users/:id', async (req, res)=>{
    try{
        await client.query(`Select * from users where id=${req.params.id}`)
                res.send(result.rows);
    }catch(err){
        console.error(err.message)
    }finally{
        client.end;
    }
 });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/users', async (req, res)=> {
    const user = req.body;
    try{
        console.log(user)
    const insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`
                       await client.query(insertQuery);
                            
                              res.send('Insertion was successful');
    }catch(err){
        console.error(err.message)
    }finally{
        client.end;
    }
})

app.put('/users/:id', async (req, res)=> {
     try{

        const user = req.body;
    const updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`;
                      await  client.query(updateQuery);
                         
                            res.send('Update was successful');
        
     }catch (err){
      console.error(err.message)
     }finally{
        client.end;
     }
})

app.delete('/users/:id', async (req, res)=> {
    try{
        const insertQuery = `delete from users where id=${req.params.id}`
       await client.query(insertQuery), 
                res.send('Deletion was successful');
    }catch(err){
        console.error(err.message)
    }finally{
        client.end;
    }
 })
