import express from 'express';
// const express = require('express');
import {engine} from 'express-handlebars';
// const {engine} = require('express-handlebars');
import cors from 'cors';
// const cors = require('cors');
import Conteiner from './classes/Conteiner.js';
// const Conteiner = require('./classes/Conteiner')
import router from './routes/products.js';
// const router = require('./routes/products');
import upload from './services/upload.js';
// const upload = require('./services/upload')
import {Server} from 'socket.io'
// const {Server} = require('socket.io');
import __dirname from './utils.js'

const PATH = __dirname+'/files/productsList.json';
const conteiner = new Conteiner(PATH);
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log('Server listening on port: '+PORT)
})
const io = new Server(server);

app.use(express.static(__dirname+'/public'))
app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views',__dirname+'/views');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0]);
    next();
})
app.use('/api/products',router);

//ejemplo chat
let messages=[]
io.on('connection',socket=>{
    console.log('Cliente conectado')
    socket.emit('messagelog',messages)
    socket.emit('welcome','Socket conectado')
    socket.on('message', data=>{
        messages.push(data)
        io.emit('messagelog',messages);
    })
})

//para subir varios archivos
// app.post('/api/uploadfile',upload.fields([
//     {
//         name:'file', maxCount:1
//     },
//     {
//         name:"documents", maxCount:3
//     }
// ]),(req,res)=>{
//     const files = req.files;
//     console.log(files);
//     if(!files||files.length===0){
//         res.status(500).send({messsage:"No se subió archivo"})
//     }
//     res.send(files);
// })

app.get('/views/products',(req,res)=>{
    conteiner.getAll().then(result=>{
        let {data}=result;        
        let preparedObj={
            products : data
        }
        res.render('products',preparedObj);
    })
})