import express from 'express';

const app = express()

app.get('/hello', (req, res)=>{
    res.send({message: 'wdddorlsd'})
})

app.listen({
    port: 3009}, ()=>{

    console.log("Listening")
})
