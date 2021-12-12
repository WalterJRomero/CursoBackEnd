import express from 'express';
import Conteiner from '../classes/Conteiner.js';
// import upload from '../services/upload.js';
import __dirname from '../utils.js';
import {io} from '../server.js'
import { authMiddleware } from '../utils.js';

const router = express.Router();
const PATH = __dirname+'/files/productsList.json';
const conteiner = new Conteiner(PATH);

//GET para buscar todos los productos
router.get('/',async (req,res)=>{    
    let {data} = await conteiner.getAll();
    res.send(data)
})
//GET para buscar un producto por su id
router.get('/:id',async (req,res)=>{   
    let idReq = parseInt(req.params.id);    
    let {data} = await conteiner.getById(idReq);       
    if(data) {
        res.send(data)
    } else {
        res.status(404).send({error:'producto no encontrado'})
    }
})

//POST para guardar un producto y luego visualizar el id asignado
router.post('/',authMiddleware,async (req,res)=>{      
        
    let newProduct = req.body;    
    let result = await conteiner.save(newProduct); 
    res.send(result)      
    if (result.status==="success"){
        conteiner.getAll().then(result=>{
            io.emit('updateProducts',result)
        })
    }    
})

//POST CON upload, se puede utilizar para adjuntar archivos
// router.post('/',upload.single('thumbnail'),async (req,res)=>{    
//     let newProduct = req.body;           
//     let thumbnail = req.protocol+"://"+req.hostname+":8080"+"/images"+req.file.filename;
//     newProduct.thumbnail= thumbnail;     
//     newProduct.price=parseInt(newProduct.price)
//     let result = await conteiner.save(newProduct); 
//     res.send(result)      
// })

// PUT permite modificar algun dato del producto
router.put('/:id',authMiddleware,async (req,res)=>{           
    let idReq = parseInt(req.params.id);
    let upProduct = req.body;
    let data = await conteiner.updateProduct(idReq,upProduct);
    res.send(data) 
             
})

// DELETE borra un producto por su id
router.delete('/:id',authMiddleware,async (req,res)=>{ 
    let idReq = parseInt(req.params.id);
    let data = await conteiner.deletebyId(idReq);
    res.send(data)    
})

export default router