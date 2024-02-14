import addProduct from "./addProduct"
import getProducts from "./getAllProducts"
import getSpecificUserProducts from "./getCurrentUserProducts"
import getSpecificProduct from "./getSpecificProduct"
import getAvailableProducts from "./getAvailableProducts"
import updateProduct from "./updateProduct"
import makeProductAvailable from "./makeProductAvailable"
import makeProductSoldout from "./makeProductSoldout"
import getSpecificSellerProducts from "./getSpecificSellerProducts"
import banOneProduct from "./banOneProduct"
import getCountOfProductsAddedByUser from "./getCountOfProductsAddedByUser"
import reportProduct from "./reportProduct"
import getReportedProducts from "./getReportedProducts"
import changeProductStatus from "./changeProductStatus"
import getMostActiveTenLocations from "./getMostActiveTenLocations"

export default ( dependencies: any) => {
    return {
        addProductController: addProduct(dependencies),
        getProductsController: getProducts(dependencies),
        getSpecificUserProductsController : getSpecificUserProducts(dependencies),
        getSpecificProductController: getSpecificProduct(dependencies),
        getAvailableProductsController: getAvailableProducts(dependencies),
        updateProductController: updateProduct(dependencies),
        makeProductAvailableController: makeProductAvailable(dependencies),
        makeProductSoldoutController: makeProductSoldout(dependencies),
        getSpecificSellerProductsController: getSpecificSellerProducts(dependencies),
        banOneProductController: banOneProduct(dependencies),
        getCountOfProductsAddedByUserController: getCountOfProductsAddedByUser(dependencies),
        reportProductController: reportProduct(dependencies),
        getReportedProductsController: getReportedProducts(dependencies),
        changeProductStatusController: changeProductStatus(dependencies),
        getMostActiveTenLocationsController: getMostActiveTenLocations(dependencies)
    }
}
