import FileConteiner from "../../contenedores/FileConteiner.js";
import fs from 'fs'

export default class CartsFileSystem extends FileConteiner{
    constructor(){
        super('cartList.json')
    }

    // crea un carrito y devuelve el id del carrito
    async createCart(){         
        try{
            let data =await fs.promises.readFile(this.url,'utf-8');
            let newCart=JSON.parse(data);           
            let nuevoId = newCart[newCart.length-1].id+1;            
            if (newCart.some(res=>res.id===nuevoId)){ 
                return {status:"error",message:"Carrito existente"}
            }else{
                let timestamp = Date.now();
                let time = new Date(timestamp);
                let cart = {
                    id:nuevoId,
                    timestamp:time,
                    products:[]
                }                                
                newCart.push(cart);
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify(newCart,null,2));                                        
                    return {status:"success",message:"Carrito creado",id:cart.id}

                }catch(err){
                    return {status:"error",message:"No se pudo crear el carrito"}
                }
            }             
        }catch{             
            let timestamp = Date.now();
            let time = new Date(timestamp);
            let cart = {
                id:1,
                timestamp:time,
                products:[]                
            }    
            try {
                await fs.promises.writeFile(this.url,JSON.stringify([cart]),null,2) 
                return {status:"success",message:"Carrito creado",id:cart.id}
            }catch(err){
                return {status:"error",message:"No se pudo crear el archivo"}
            }
        }
    }
    
    //devuelve todos los productos del carrito elegido
    async getProducts(cartId_request){
        try{            
            let data = await fs.promises.readFile(this.url,'utf-8');            
            let cartProducts = JSON.parse(data);            
            let prod = cartProducts.find(prod=>prod.id===cartId_request);                      
            if (prod){                
                if(prod.products.length>0){
                    return {status:"success",data:prod.products}
                }else{
                    return {status:"error",message:"El carrito aún no tiene productos"}               
                }                   
            }else{
                return {status:"error",message:"No existe un carrito con el id elegido"}           
            }            
        }catch(err){
            return {status:"error",message:err}
        }
    }
    //agrega un producto (solo id) al carrito elegido
    async addProductToCart(cartId_request,productId){        
        try{
            let dataSaved = await fs.promises.readFile(this.url,'utf-8');
            let newCartArray = JSON.parse(dataSaved); 
            if(!newCartArray.some(cart=>cart.id===cartId_request)) {
                return {status:"error", message:"No existe un carrito con el id elegido"}
            }
            let duplicate = newCartArray.find(cart=>cart.id===cartId_request);            
            let productFind = duplicate.products.find(id=>id===productId);            
            if (productFind) {
                return {status:"error", message:"Producto ya agregado al carrito, no es posible añadirlo nuevamente "}
            }         
            let result = newCartArray.map(cart=>{                
                if(cart.id===cartId_request){     
                    let cartProduct = cart;                   
                    cartProduct = Object.assign(cartProduct,{
                        timestamp:cartProduct.timestamp,
                        products:[...cartProduct.products,
                        productId]});                    
                    cartProduct = Object.assign({...cartProduct,id:cart.id});                   
                    return cartProduct                    
                }else{                                 
                    return cart;
                }
            })
            try{
                await fs.promises.writeFile(this.url,JSON.stringify(result,null,2));
                return {status:"success", message:"Producto agregado al carrito"}
            }catch{
                return {status:"error", message:"Fallo al agregar un producto al carrito"}
            }
        }catch(err){
            return {status:"error",message:"Fallo al agregar un producto al carrito"}
        }
    }

    //borra producto de un carrito
    async delProductById(cartId_request,productId_request){
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            let carts = JSON.parse(data);            
            let result = carts.map(cart=>{                
                if(cart.id===cartId_request){                       
                    let cartProduct = cart;                         
                    let itemfind = cart.products.filter((p=>p!=productId_request));
                    cartProduct = Object.assign(cartProduct,{timestamp:cartProduct.timestamp,products:itemfind});                    
                    cartProduct = Object.assign({...cartProduct,id:cart.id});     
                    return cartProduct                    
                }else {
                    return cart
                }                                
            })
            try{               
                await fs.promises.writeFile(this.url,JSON.stringify(result,null,2));
                return {status:"success", message:"Producto eliminado del carrito"}
            }catch{
                return {status:"error", message:"Error al eliminar producto del carrito"}
            }                  
        }catch(err){
            return {status:"error",message:err}
        }
    }
    
    //borra un carrito por su id
    async deleteCartbyId(cartId_request){
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            let newCart = JSON.parse(data); 
            let cart = newCart.find(res=>res.id===cartId_request);
            if (cart){
                let newCartUpdate = newCart.filter((p)=>p.id!=cartId_request)                           
                await fs.promises.writeFile(this.url,JSON.stringify(newCartUpdate),null,2)                 
                return {status:"success",message:"Se eliminó correctamente el carrito elegido"} 
            }else{
                return {status:"error",message:"No existe un carrito con el id elegigo"}           
            }         
        }catch(err){
            return {status:"error",message:err}
        }
    }       

}