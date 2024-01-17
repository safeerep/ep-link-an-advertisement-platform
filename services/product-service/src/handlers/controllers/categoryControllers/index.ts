import addNewCategory from "./addNewCategory"
import getAllCategories from "./getAllCategories"
import changeCategoryStatus from "./changeCategoryStatus"
import getCurrentCategory from "./getCurrentCategory"
import updateCategory from "./updateCategory"

export = ( dependencies: any) => {
    return {
        addNewCategoryController: addNewCategory(dependencies),
        getAllCategoriesController: getAllCategories(dependencies),
        changeCategoryStatusController: changeCategoryStatus(dependencies),
        getCurrentCategoryController: getCurrentCategory(dependencies),
        updateCategoryController: updateCategory(dependencies)
    }
}