import Dao from "../contenedores/daoChat.js";
import AuthorService from '../services/authors.js';
import MessageService from "../services/messages.js";

const dao = new Dao();

export const authorService = new AuthorService(dao);
export const messageService = new MessageService(dao);