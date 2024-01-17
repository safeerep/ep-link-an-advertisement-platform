import addProduct from "./addProduct"
import getProducts from "./getAllProducts"
import getSpecificUserProducts from "./getCurrentUserProducts"
import getSpecificProduct from "./getSpecificProduct"


export = ( dependencies: any) => {
    return {
        addProductController: addProduct(dependencies),
        getProductsController: getProducts(dependencies),
        getSpecificUserProductsController : getSpecificUserProducts(dependencies),
        getSpecificProductController: getSpecificProduct(dependencies),
    }
}