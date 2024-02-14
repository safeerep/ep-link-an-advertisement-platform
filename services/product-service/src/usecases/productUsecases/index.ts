import { addProduct_usecase } from "./addProduct"
import { getProducts_usecase } from "./getProducts"
import { getCurrentUserProducts_usecase } from "./getCurrentUserProducts"
import { getOneSpecificProduct_usecase } from "./getSpecificProduct"
import { getAvailableProducts_usecase } from "./getAvailableProducts"
import { updateProduct_usecase } from "./updateProduct"
import { makeProductAsAvailable_usecase } from "./makeProductAvailable"
import { makeProductAsSoldout_usecase } from "./makeProductSoldout"
import { banProduct_usecase } from "./banProduct"
import { changeProductStatus_usecase } from "./changeProductStatus"
import { reportProduct_usecase } from "./reportProduct"
import { getReportedProducts_usecase } from "./getReportedProducts"
import { getCurrentUserProductsCount_usecase } from "./getCountOfProductsAddedByUser"
import { getMostActiveTenLocations_usecase } from "./getMostActiveLocations"


export default {
    addProduct_usecase,
    getProducts_usecase,
    getCurrentUserProducts_usecase,
    getOneSpecificProduct_usecase,
    getAvailableProducts_usecase,
    updateProduct_usecase,
    makeProductAsAvailable_usecase,
    makeProductAsSoldout_usecase,
    banProduct_usecase,
    reportProduct_usecase,
    getReportedProducts_usecase,
    changeProductStatus_usecase,
    getCurrentUserProductsCount_usecase,
    getMostActiveTenLocations_usecase
}