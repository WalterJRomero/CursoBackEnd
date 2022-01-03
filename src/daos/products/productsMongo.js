import MongoConteiner from "../../contenedores/MongoConteiner.js";

export default class ProductsMongo extends MongoConteiner{
    constructor(){
        super(
            'products',
            {
                title:{type:String,unique:true,required:true},
                description:{type:String,required:true},
                code:{type:String,required:true},
                thumbnail:{type:String,required:true},
                price:{type:Number,required:true},
                stock:{type:Number,required:true}
            },
            {timestamps:true}
        )

    }
    //metodo utilizado para guardar un producto
    async save(product){         
        try {            
            let exist = await this.collection.find({title:product.title})                 
            if (exist.length!=0) return {status:"error",message:"Producto existente, no es posible agregar otro producto igual"}
            let result = await this.collection.create(product)            
            result.save()
            let data = (JSON.parse(JSON.stringify(result)))            
            return {status:'sucess', data:`Producto creado con id: ${data._id}`}
        }catch(error){
            return {status:'error', message:error}
        }
    }
   
    //este metodo se utiliza para buscar un producto por su id
    async getById(idRequest){
        try{            
            let data = await this.collection.find({_id:idRequest})                          
            let dataProcessed = (JSON.parse(JSON.stringify(data)))                       
            if (dataProcessed.length!=0){
                return {status:"success",data:dataProcessed}
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
            let data = await this.collection.find();             
            let dataProcessed = (JSON.parse(JSON.stringify(data)))                 
            if (dataProcessed.length==0){                
                return {status:"error",message:"No se encontraron productos"}           
            }else{                
                return {status:"success",data:dataProcessed}
            }            
        }catch(err){
            return {status:"error", message:err}
        }
    }

    //metodo utilizado para actualizar caracteristicas del producto, se requiere ID y el producto
    async updateProduct(idRequest,productSelect){
        try{
            let data = await this.collection.find({_id:idRequest})     
            let dataProcessed = (JSON.parse(JSON.stringify(data)))             
            try{
                if(dataProcessed.length==0){                    
                    return {status:"error", message:"No hay un producto con el id elegido"}
                }else { 
                    let result = await this.collection.updateOne({_id:idRequest},
                        {$set:{title:productSelect.title,description:productSelect.description,code:productSelect.code,thumbnail:productSelect.thumbnail,price:productSelect.price,stock:productSelect.stock}})                                                          
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
            let data = await this.collection.find({_id:idRequest}); 
            let dataProcessed = (JSON.parse(JSON.stringify(data)))                              
            if (dataProcessed.length!=0){
                let newProducts = await this.collection.deleteOne({_id:idRequest})                              
                return {status:"success",message:"Se eliminó el producto elegido"} 
            }else{
                return {status:"error",message:"No había productos para eliminar"}           
            }         
        }catch(err){
            return {status:"error",message:"Producto no encontrado"}
        }
    }
}