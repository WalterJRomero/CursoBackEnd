import express from 'express';
import __dirname from '../utils.js';
import { products,carts, persistence } from '../daos/index.js';

const cartRouter = express.Router();

//POST creacion del carrito y devuelve su id
cartRouter.post('/',async (req,res)=>{        
    console.log('aca en post carrito')  
    let idCart = await carts.createCart();    
    res.send(idCart);
    if (idCart.status==="success"){
        console.log(`Carrito creado con id: ${idCart.id}`)
    }    
})

//POST agrego productos al carrito 
cartRouter.post('/:id/products',async (req,res)=>{      
    let idReq = req.params.id;   
    let prodId = req.body.products;     
    if (persistence=='fileSystem'){
        idReq = parseInt(idReq);
        prodId = parseInt(req.body.products);
    } 
    //consulto si existe el producto que se intenta agregar
    let prodExist = await products.getById(prodId);    
    if (prodExist.status!='error'){   
        let result = await carts.addProductToCart(idReq,prodId);        
        res.send(result);
    } else {
        res.status(404).send({error:'Id de producto no valido, este producto no existe'})
    }
})

//GET muestra un carrito especifico por ID con sus productos
cartRouter.get('/:id/products',async (req,res)=>{   
    let idReq = req.params.id;   
    if (persistence=='fileSystem'){
        idReq= parseInt(idReq);
    }        
    let {data, message} = await carts.getProducts(idReq);          
    if (!message){
        res.send(data);
    }else {
        res.status(404).send({error: message});
    }
})

//DELETE borra un carrito especifico
cartRouter.delete('/:id',async (req,res)=>{ 
    let idReq = req.params.id;   
    if (persistence=='fileSystem'){
        idReq= parseInt(idReq);
    }   
    let data = await carts.deleteCartbyId(idReq);    
    res.send(data);    
})


//DELETE borra productos(id_prod) de un carrito(id)
cartRouter.delete('/:id/products/:id_prod',async (req,res)=>{      
    let cart_id = req.params.id;  
    let prod_id= req.params.id_prod;
    if (persistence=='fileSystem'){
        cart_id = parseInt(req.params.id);   
        prod_id= parseInt(req.params.id_prod); 
    }    
    let {data,message} = await carts.getProducts(cart_id);           
    if (!message){                
        let prodFind = data.find(prod=>prod===prod_id);        
        if (prodFind){
            let result = await carts.delProductById(cart_id,prod_id);           
            res.send(result);
        } else{
            res.status(404).send({error:'Este producto no existe en el carrito'});
        }                   
    }else {
        res.status(404).send({error: message});    
    }
})

export default cartRouter