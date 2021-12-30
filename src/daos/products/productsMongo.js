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
            },{timestamps:true}
        )

    }
}