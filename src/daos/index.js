let products;
let carts;
let persistence = 'mongo';

switch(persistence){
    case "fileSystem":
        const{default:ProductsFileSystem} = await import ('./products/productsFileSystem.js');
        const{default:CartsFileSystem} = await import ('./carts/cartsFileSystem.js');
        products = new ProductsFileSystem();
        carts = new CartsFileSystem();        
        break;
    case "mongo":
        const{default:ProductsMongo} = await import ('./products/productsMongo.js');
        const{default:CartsMongo} = await import ('./carts/cartsMongo.js');
        products = new ProductsMongo();
        carts = new CartsMongo(); 
        break;
    default:

}export {products,carts}