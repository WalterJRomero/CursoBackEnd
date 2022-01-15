import mongoose from 'mongoose';
import Author from '../daos/authors/author.js';
import Message from '../daos/messages/message.js';
import config from '../config.js';

export default class Dao{
    constructor(){
        mongoose.connect(config.mongo.baseUrl,{ useNewUrlParser: true }).catch(error=>{
            console.error(error);
            process.exit();
        })

        const timestamp = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}};
        const AuthorSchema = mongoose.Schema(Author.schema,timestamp);
        
        const MessageSchema = mongoose.Schema(Message.schema,timestamp);
        MessageSchema.pre('find',function(){
            this.populate('author')
        })

        this.models={
            [Author.model]:mongoose.model(Author.model,AuthorSchema),
            [Message.model]:mongoose.model(Message.model,MessageSchema)
        }
    }
    async get(options,entity){
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`);
        return this.models[entity].findOne(options);
    }
    async getAll(options,entity){
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`);
        let results = await this.models[entity].find(options);
        return results.map(result=>result)
    }
    async findOne( options, entity ) {
		if( !this.models[entity] ) throw new Error( 'Entity ' + entity + ' not found or defined.' );
		let result = await this.models[entity].findOne( options );
		return result ? result.toObject() : null;
	}
    async findAll(options,entity){
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`);
        let results = await this.models[entity].find(options);
        return results.map(result=>result.toObject())
    }
    async insert(document,entity){
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`);
        try{
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result? result.toObject():null;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    async remove(id,entity){
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`);
        let result = await this.modes[entity].findByIdAndDelete(id);
        return result? result.toObject():null;
    }
    async exists (entity, options) {
		if( !this.models[entity] ) throw new Error( 'Entity ' + entity + ' not found or defined.' );
		return this.models[entity].exists( options );
	}
}