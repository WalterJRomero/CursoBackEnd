const express = require ('express');
const router = express.Router();
const Conteiner = require('../classes/Conteiner');
const PATH = './files/productsList.json';
const conteiner = new Conteiner(PATH);
const upload = require('../services/upload')

//GET
router.get('/',async (req,res)=>{    
    let {data} = await conteiner.getAll()    
    res.send(data)
})

router.get('/:id',async (req,res)=>{   
    let idReq = parseInt(req.params.id)     
    let {data} = await conteiner.getById(idReq)       
    if(data) {
        res.send(data)
    } else {
        res.status(404).send({error:'producto no encontrado'})
    }
})

// POST sin upload
router.post('/',async (req,res)=>{    
    let newProduct = req.body; 
    console.log(newProduct)
    let result = await conteiner.save(newProduct); 
    res.send(result)      
})

//POST CON upload
// router.post('/',upload.single('thumbnail'),async (req,res)=>{    
//     let newProduct = req.body;           
//     let thumbnail = "http://localhost:8080/api/images/"+req.file.filename;
//     newProduct.thumbnail= thumbnail;     
//     newProduct.price=parseInt(newProduct.price)
//     let result = await conteiner.save(newProduct); 
//     res.send(result)      
// })

//POST CON upload fields
// router.post('/',upload.fields({
//  [
//      {
//          name:"thumbnail",maxCount:1,
//      },
//      {
//          name:"documents",maxCount:1,
//      }
//]
//}),async (req,res)=>{    
//     let newProduct = req.body;           
//     let thumbnail = "http://localhost:8080/api/images/"+req.file.filename;
//     newProduct.thumbnail= thumbnail;     
//     newProduct.price=parseInt(newProduct.price)
//     let result = await conteiner.save(newProduct); 
//     res.send(result)      
// })

// PUT
router.put('/:id',async (req,res)=>{    
        let idReq = parseInt(req.params.id);
    let upProduct = req.body;
    let data = await conteiner.updateProduct(idReq,upProduct)
    res.send(data)       
})

// DELETE
router.delete('/:id',async (req,res)=>{ 
    let idReq = parseInt(req.params.id);
    let data = await conteiner.deletebyId(idReq)
    res.send(data)
})

module.exports = router;