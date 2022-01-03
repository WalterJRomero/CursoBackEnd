import FbConteiner from "../../contenedores/FbConteiner.js";
import admin from 'firebase-admin'

export default class ProductsFb extends FbConteiner{
    constructor(){
        super(
            'products'
        )        
    }
    async save(product){        
        try {           
            let data = await this.currentCollection.get()
            let products = data.docs
            const productsProcessed = products.map(document=>document.data())                
            if (productsProcessed.some(prod=>prod.title===product.title)){ 
                return {status:"error",message:"Producto existente, no es posible agregar otro producto igual"}
            }                         
            let timestamp = admin.firestore.Timestamp.now()
            product.timestamp = timestamp
            let doc = this.currentCollection.doc()
            await doc.set(product)           
            return {status:'sucess', data:`Producto creado con id: ${doc.id} `}
        }catch(error){
            return {status:'error', message:error}
        }
    }

    //este metodo se utiliza para buscar un producto por su id
    async getById(idRequest){
        try{            
            const doc = this.currentCollection.doc(idRequest)       
            let product = await doc.get();
            let productProcessed = product.data()             
            if (productProcessed){
                productProcessed.id = idRequest
                return {status:"success",data:productProcessed}
            }else{
                return {status:"error",message:"Producto no encontrado"}           
            }            
        }catch(err){
            return {status:"error",message:err}
        }
    }

    //metodo para devolver todos los productos del archivo guardado
    async getAll(){
        try{    
            const products = await this.currentCollection.get()
            const dataProcessed = products.docs;
            const showProducts = dataProcessed.map(document =>document.data())                                     
            if (showProducts.length==0){                
                return {status:"error",message:"No se encontraron productos"}           
            }else{                
                return {status:"success",data:showProducts}
            }            
        }catch(err){
            return {status:"error", message:err}
        }
    }

    //metodo utilizado para actualizar caracteristicas del producto, se requiere ID y el producto
    async updateProduct(idRequest,productSelect){    
        try{
            const data = this.currentCollection.doc(idRequest)    
            let product = await data.get();
            let productProcessed = product.data()                      
            try{
                if(!productProcessed){                    
                    return {status:"error", message:"No hay un producto con el id elegido"}
                }else { 
                    await data.update({title:productSelect.title,description:productSelect.description,code:productSelect.code,thumbnail:productSelect.thumbnail,price:productSelect.price,stock:productSelect.stock,timestamp:admin.firestore.Timestamp.now()})
                    return {status:"success", message:"Producto actualizado"}
                    }                   
            }catch{
                return {status:"error", message:"Error al actualizar el producto"}
            }
        }catch(err){
            return {status:"error",message:"Fallo al actualizar el producto"}
        }        
    }

    //permite borrar un producto por su numero de id
    async deletebyId(idRequest){
        try{
            const doc = this.currentCollection.doc(idRequest)       
            let product = await doc.get();
            let productProcessed = product.data()             
            if (productProcessed){
                const doc= this.currentCollection.doc(idRequest)
                await doc.delete()
                return {status:"success",message:"Se eliminó el producto elegido"} 
            }else{
                return {status:"error",message:"No había productos para eliminar"}           
            }         
        }catch(err){
            return {status:"error",message:"Producto no encontrado"}
        }
    }
}