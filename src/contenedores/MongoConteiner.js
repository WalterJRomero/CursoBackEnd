import mongoose  from "mongoose";
import config from '../config.js'

mongoose.connect(config.mongo.baseUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
})

export default class MongoConteiner{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }  
}
