import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors'
import Conteiner from './classes/Conteiner.js';
import upload from './services/upload.js'
import router from './routes/products.js'

const PATH = './files/productsList.json';
const conteiner = new Conteiner(PATH);
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log('Server listening on port: '+PORT)
})

app.engine('handlebars',engine())
app.set('views','./views');
app.set('view engine','handlebars')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0])
    next();
})
app.use(express.static('public'));
app.use('/api/products',router)

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
        res.render('products',preparedObj)

    })
})