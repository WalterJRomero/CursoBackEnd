import Message from "../daos/messages/message.js";
import GenericQueries from "./genericQueries.js";

export default class MessageService extends GenericQueries{
    constructor(dao){
        super(dao,Message.model);
    }
    async getAllWithFormattedIds(params){
        let documents  = await this.dao.findAll(params,this.model);
        console.log(documents);
        documents = documents.map(document=>{
            document.id=document._id;
            document.author.id = document.author._id;
            delete document._id;
            delete document['author']['_id'];
            delete document.__v
            return document;
        });
        return documents;
    }
    async getDataToNormalize(params){
        let documents  = await this.dao.findAll(params,this.model);
        console.log(documents);
        documents = documents.map(document=>{
            document._id = document._id.toString();
            document['author']['_id'] = document['author']['_id'].toString();
            delete document.__v;
            return document;
            // document.id=document._id.toString();
            // document.user.id =document.user._id.toString();
            // delete document._id;
            // delete document['user']['_id'];
            // delete document.__v;
            // return document;
        });
        let object = {
            id:"Messages",
            messages:documents
        }
        return object;
    }
}