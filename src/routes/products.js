import express from 'express';
import __dirname from '../utils.js';
import {io} from '../server.js'
import { authMiddleware } from '../utils.js';
import {products,persistence} from '../daos/index.js'

const router = express.Router();

//GET para buscar todos los productos
router.get('/',async (req,res)=>{    
    let {data,message} = await products.getAll();    
    if (data) {
        res.send(data);
    } else {
       res.status(404).send({error:message});
    }    
})
//GET para buscar un producto por su id
router.get('/:id',async (req,res)=>{   
    let idReq = req.params.id;   
    if (persistence=='fileSystem'){
        idReq= parseInt(idReq);
    }    
    let {data} = await products.getById(idReq);      
    if(data) {
        res.send(data);
    } else {
        res.status(404).send({error:`Producto con id: ${idReq} no encontrado`});
    }
})

//POST para guardar un producto y luego visualizar el id asignado
router.post('/',authMiddleware,async (req,res)=>{            
    let newProduct = req.body;    
    let result = await products.save(newProduct);   
    res.send(result);      
    if (result.status==="success"){        
            products.getAll().then(result=>{            
            io.emit('updateProducts',result);
        })
    }    
})

// PUT permite modificar algun dato del producto
router.put('/:id',authMiddleware,async (req,res)=>{           
    let idReq = req.params.id;   
    if (persistence=='fileSystem'){
        idReq= parseInt(idReq);
    }    
    let upProduct = req.body;
    let data = await products.updateProduct(idReq,upProduct);   
    res.send(data)              
})

// DELETE borra un producto por su id
router.delete('/:id',authMiddleware,async (req,res)=>{ 
    let idReq = req.params.id;   
    if (persistence=='fileSystem'){
        idReq= parseInt(idReq)
    }    
    let data = await products.deletebyId(idReq);    
    res.send(data)    
})

export default router