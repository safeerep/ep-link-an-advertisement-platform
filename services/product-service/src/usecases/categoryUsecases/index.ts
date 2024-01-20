import { addNewCategory_usecase } from "./addCategory";
import { checkIsCategoryExisting_usecase } from "./checkIsExisting";
import { getCategories_usecase } from "./getCategories";
import { getCurrentStatusOfCategory_usecase } from "./getCurrentStatus";
import { changeCategoryStatus_usecase } from "./changeCategoryStatus";
import { changeProductsStatusByCategory_usecase } from "./changeProductStatusByCategory";
import { getSpecificCategory_usecase } from "./getSpecificCategory";
import { isCategoryExistWithId_usecase } from "./checkIsExistingWithId";
import { updateCategoryDetails_usecase } from "./updateCategory";
import { getActiveCategories_usecase } from "./getActiveCategories";

export default {
    addNewCategory_usecase,
    checkIsCategoryExisting_usecase,
    getCategories_usecase,
    getCurrentStatusOfCategory_usecase,
    changeCategoryStatus_usecase,
    changeProductsStatusByCategory_usecase,
    getSpecificCategory_usecase,
    isCategoryExistWithId_usecase,
    updateCategoryDetails_usecase,
    getActiveCategories_usecase
}