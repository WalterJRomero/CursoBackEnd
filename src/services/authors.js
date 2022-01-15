import Author from "../daos/authors/author.js";
import GenericQueries from "./genericQueries.js";

export default class AuthorService extends GenericQueries{
    constructor(dao){
        super(dao,Author.model);
    }
    async findByUsername(username){
        return this.dao.findOne({username},Author.model);
    }
}