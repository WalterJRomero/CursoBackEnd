import knex from 'knex';
import __dirname from './utils.js';
export const db = knex({
    client:'sqlite3',
    connection:{filename:__dirname+'/db/ecommerce.sqlite' }
})

export const database = knex ({
    client:'mysql',
    version:'10.4.22',
    connection:{
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'',
        database:'ecommerce'
    },
    pool:{min:0,max:10}
})

export default{
    fileSystem:{
        baseUrl:__dirname+'/files/'
    },
    mongo:{
        baseUrl:'mongodb+srv://wjromero:1234@ecommerce.rpxxc.mongodb.net/ecommerce?retryWrites=true&w=majority'
    },
    fb:{

    }
}


// mongoose.connect(URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(async res=>{
    // console.log("Base de datos Mongo conectada")
    // let products = [
    //     {title:"Nissin Cup Noodle Tom Yum 3-Pack",description:"Tom Yum Kung Noodles from the Cup Noodle Ethnic Series that delivers authentic delicious food.",code:"123311",thumbnail:"https://cdn.shopify.com/s/files/1/0231/1294/1648/products/NIS9b_860x.jpg?v=1634331568",price:"1333",stock:"123"},
    //     {title:"product2",description:"Tom Yum Kung Noodles from the Cup Noodle Ethnic Series that delivers authentic delicious food.",code:"123311",thumbnail:"https://cdn.shopify.com/s/files/1/0231/1294/1648/products/NIS9b_860x.jpg?v=1634331568",price:"1333",stock:"123"},
    //     {title:"product3",description:"Tom Yum Kung Noodles from the Cup Noodle Ethnic Series that delivers authentic delicious food.",code:"123311",thumbnail:"https://cdn.shopify.com/s/files/1/0231/1294/1648/products/NIS9b_860x.jpg?v=1634331568",price:"1333",stock:"123"}
    // ]
    // let prod4= {title:"product4",description:"Tom Yum Kung Noodles from the Cup Noodle Ethnic Series that delivers authentic delicious food.",code:"123311",thumbnail:"https://cdn.shopify.com/s/files/1/0231/1294/1648/products/NIS9b_860x.jpg?v=1634331568",price:"1333",stock:"123"}
    
    //agregar muchos productos
    // await productsService.insertMany(products);

    //agregar un producto
    // let add = await productsService.create(prod4)    
    // await add.save()
    // let idFind  = await productsService.find(prod4)
    // let id = JSON.parse(JSON.stringify(idFind))
    // console.log(id[0]._id)

    //buscar productos
    // let productsFind = await productsService.find()
    // console.log(productsFind)

    //buscar producto por id
    // let idFind  = await productsService.find()

    //actualizar productos
    // let result = await productsService.updateOne({_id},{$set:{title:newTitle,description:newDescription,code:newCode,thumbnail:newThumbnail,price:newPrice,stock:newStock}})
// })

