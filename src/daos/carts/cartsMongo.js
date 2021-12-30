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
}