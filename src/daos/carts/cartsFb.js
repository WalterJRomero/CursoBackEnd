import FbConteiner from "../../contenedores/FbConteiner.js";
import admin from 'firebase-admin'

export default class CartsFb extends FbConteiner{
    constructor(){
        super(
            'carts'
        )        
    }

    async createCart(){         
        try {            
            let result = this.currentCollection.doc()
            await result.set({products:[],timestamp:admin.firestore.Timestamp.now()})                                
            return {status:'sucess', data:`Carrito creado con id: ${result.id}`}
        }catch(error){
            return {status:'error', message:error}
        }
    }
    
    // //devuelve todos los productos del carrito elegido
    async getProducts(idRequest){        
        try{         
            const doc = this.currentCollection.doc(idRequest)                             
            let product = await doc.get();
            let productProcessed = product.data()                 
            if (productProcessed){
                if(productProcessed.products.length>0){
                    return {status:"success",data:productProcessed.products}
                }else{
                    return {status:"error",message:"El carrito aún no tiene productos"}               
                } 
            }else{
                 return {status:"error",message:"Carrito no encontrado"}           
            }            
        }catch(err){
            return {status:"error",message:err}
        }
    }

    // //agrega un producto (solo id) al carrito elegido
    async addProductToCart(cartId,productId){
        try{           
            let doc = this.currentCollection.doc(cartId)
            let product = await doc.get();
            let productProcessed = product.data()            
            let productFind = productProcessed.products.find(id=>id==productId);            
            if (productFind) {
                return {status:"error", message:"Producto ya agregado al carrito, no es posible añadirlo nuevamente "}
            } 
            let newArray= [...productProcessed.products,productId]            
            try{
                let result = await doc.update({products:newArray})             
                return {status:"success", message:"Producto agregado al carrito"}
            }catch{
                return {status:"error", message:"Fallo al agregar un producto al carrito"}
            }
        }catch(err){
            return {status:"error",message:"Fallo al agregar un producto al carrito"}
        }
    }

    // //borra producto de un carrito
    async delProductById(cartId,productId){
        try{
            let data = this.currentCollection.doc(cartId) 
            let product = await data.get();
            let productProcessed = product.data()         
            let result1 = productProcessed.products.filter((p=>p!=productId))
            try{               
                let result = await data.update({products:result1})
                return {status:"success", message:"Producto eliminado del carrito"}
            }catch{
                return {status:"error", message:"Error al eliminar producto del carrito"}
            }                  
        }catch(err){
            return {status:"error",message:err}
        }
    }
    
    // //borra un carrito por su id
    async deleteCartbyId(idRequest){       
        try{                                                
            let data = this.currentCollection.doc(idRequest) 
            let product = await data.get();
            let productProcessed = product.data()
            if (productProcessed){
                let newCarts = await data.delete()                              
                return {status:"success",message:"Se eliminó correctamente el carrito elegido"} 
            }else{
                return {status:"error",message:"No existe un carrito con el id elegigo"}           
            }         
        }catch(err){
            return {status:"error",message:"Carrito no encontrado"}
        }    
    }       

}
