import express from 'express';
import Conteiner from '../classes/Conteiner.js';
import Cart from '../classes/Cart.js';
import __dirname from '../utils.js';
import {io} from '../server.js'
import { authMiddleware } from '../utils.js';

const cartRouter = express.Router();
const PATH = __dirname+'/files/cartList.json';
const PRODUCTSPATH = __dirname+'/files/productsList.json';
const conteiner = new Conteiner(PRODUCTSPATH);
const cart = new Cart(PATH);
let idCart = null


//POST creacion del carrito y devuelve su id
cartRouter.post('/',async (req,res)=>{          
    idCart = await cart.createCart() 
    res.send(idCart)      
    if (idCart.status==="success"){
        console.log(`carrito creado con id: ${idCart.id}`)
    }    
})

//POST agrego al carrito 
cartRouter.post('/:id/products',async (req,res)=>{      
    let idReq = parseInt(req.params.id);     
    let prodId = parseInt(req.body.products)    
    let cartUpdate = await cart.addProductToCart(idReq,prodId)    
    if(cartUpdate) {
        res.send(cartUpdate)        
    } else {
        res.status(404).send({error:'CARRITO no encontrado'})
    }        
})

//GET muestra todos los carritos con sus productos
cartRouter.get('/',async (req,res)=>{    
    let {data} = await cart.getAllCart();
    res.send(data)
})


//GET muestra un carrito especifico por ID con sus productos
cartRouter.get('/:id/products',async (req,res)=>{   
    let idReq = parseInt(req.params.id);    
    let {data} = await cart.getProducts(idReq);          
    if(data) {
        res.send(data.products)
    } else {
        res.status(404).send({error:'carrito no encontrado'})
    }
})

//DELETE borra un carrito especifico
cartRouter.delete('/:id',async (req,res)=>{ 
    let idReq = parseInt(req.params.id);
    let data = await cart.deleteCartbyId(idReq);
    res.send(data)    
})


//DELETE borra productos(id_prod) de un carrito(id)
cartRouter.delete('/:id/products/:id_prod',async (req,res)=>{ 
    let cart_id = parseInt(req.params.id);
    let prod_id= parseInt(req.params.id_prod);     
    let data = await cart.delProductById(cart_id,prod_id);
    if(data) {
        res.send(data)
    } else {
        res.status(404).send({error:'no se pudo completar la acción'})
    }       
})

export default cartRouter