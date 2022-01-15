
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

export default class Author{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Authors';
    }
    static get schema(){
        return {
            first_name:{
                type:String,
                required:true,
            },
            last_name:{
                type:String,
                required:true,
            },
            age:{
                type:Number
            },
            username:{
                type:String,
                default:"anonymus",
                unique:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            // password:{
            //     type:String,
            //     required:true
            // },
            alias:{
                type:String,
                required:true
            },
            avatar:{
                type:String,
                required:true
            },


        }
    }
}