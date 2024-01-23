import { addProduct_usecase } from "./addProduct"
import { getProducts_usecase } from "./getProducts"
import { getCurrentUserProducts_usecase } from "./getCurrentUserProducts"
import { getOneSpecificProduct_usecase } from "./getSpecificProduct"
import { getAvailableProducts_usecase } from "./getAvailableProducts"
import { updateProduct_usecase } from "./updateProduct"
import { makeProductAsAvailable_usecase } from "./makeProductAvailable"
import { makeProductAsSoldout_usecase } from "./makeProductSoldout"

export default {
    addProduct_usecase,
    getProducts_usecase,
    getCurrentUserProducts_usecase,
    getOneSpecificProduct_usecase,
    getAvailableProducts_usecase,
    updateProduct_usecase,
    makeProductAsAvailable_usecase,
    makeProductAsSoldout_usecase
}