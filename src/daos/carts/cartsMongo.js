import Schema from "mongoose";
import MongoConteiner from "../../contenedores/MongoConteiner.js";

export default class CartsMongo extends MongoConteiner{
    constructor(){
        super(
            'carts',
            {
                products:{
                    type:[{
                        type:Schema.Types.ObjectId,
                        ref:'products',
                    }],
                    default:[]
                }
            },
            {timestamps:true}
        )
    }

    async createCart(){         
        try {           
            let result = await this.collection.create({products:[]})                   
            result.save()
            let data = (JSON.parse(JSON.stringify(result)))            
            return {status:'sucess', data:`Carrito creado con id: ${data._id}`}
        }catch(error){
            return {status:'error', message:error}
        }
    }
    
    //devuelve todos los productos del carrito elegido
    async getProducts(idRequest){
        try{         
            let data = await this.collection.find({_id:idRequest})                             
            let dataProcessed = (JSON.parse(JSON.stringify(data)))                            
            if (dataProcessed.length!=0){
                if(dataProcessed[0].products.length>0){
                    return {status:"success",data:dataProcessed[0].products}
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

    //agrega un producto (solo id) al carrito elegido
    async addProductToCart(cartId,productId){
        try{           
            let dataSaved = await this.collection.find({_id:cartId});
            let newCartArray = JSON.parse(JSON.stringify(dataSaved));
            let productFind = newCartArray[0].products.find(id=>id==productId);            
            if (productFind) {
                return {status:"error", message:"Producto ya agregado al carrito, no es posible añadirlo nuevamente "}
            }        
            let newArray= [...newCartArray[0].products,productId]
            try{
                let result = await this.collection.updateOne({_id:cartId},
                    {$set:{products:newArray}})               
                return {status:"success", message:"Producto agregado al carrito"}
            }catch{
                return {status:"error", message:"Fallo al agregar un producto al carrito"}
            }
        }catch(err){
            return {status:"error",message:"Fallo al agregar un producto al carrito"}
        }
    }

    //borra producto de un carrito
    async delProductById(cartId,productId){
        try{
            let dataSaved = await this.collection.find({_id:cartId});
            let newCartArray = JSON.parse(JSON.stringify(dataSaved));           
            let result1 = newCartArray[0].products.filter((p=>p!=productId))
            try{               
                let result = await this.collection.updateOne({_id:cartId},
                    {$set:{products:result1}}) 
                return {status:"success", message:"Producto eliminado del carrito"}
            }catch{
                return {status:"error", message:"Error al eliminar producto del carrito"}
            }                  
        }catch(err){
            return {status:"error",message:err}
        }
    }
    
    //borra un carrito por su id
    async deleteCartbyId(idRequest){       
        try{            
            let data = await this.collection.find({_id:idRequest});            
            let dataProcessed = (JSON.parse(JSON.stringify(data)))                              
            if (dataProcessed.length!=0){
                let newCarts = await this.collection.deleteOne({_id:idRequest})                              
                return {status:"success",message:"Se eliminó correctamente el carrito elegido"} 
            }else{
                return {status:"error",message:"No existe un carrito con el id elegigo"}           
            }         
        }catch(err){
            return {status:"error",message:"Carrito no encontrado"}
        }    
    }       
}