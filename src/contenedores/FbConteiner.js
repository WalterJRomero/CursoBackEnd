import config from '../config.js';
import admin from 'firebase-admin'
import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const serviceAccount = require("../db/ecommerce-c2058-firebase-adminsdk-gqp0m-5b1d17cf80.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://ecommerce-c2058.firebaseio.com"
});

export default class FbConteiner{
    constructor(collection){
        this.db = admin.firestore();   
        this.currentCollection = this.db.collection(collection)
    }
}
