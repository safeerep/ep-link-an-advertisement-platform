import {
  addProduct,
  getProducts,
  getCurrentUserProducts,
  changeProductStatus,
  getProductDetails,
  changeProductsStatusByCategory,
  getAvailableProducts,
  makeProductAsAvailable,
  makeProductAsSoldOut,
  updateProduct,
  reportProduct,
  getReportedProducts,
  getCurrentUserProductsCount,
  getMostActiveTenLocations
} from "./productRepo";

export default {
    addProduct,
    getCurrentUserProducts,
    changeProductStatus,
    getProducts,
    getAvailableProducts,
    makeProductAsSoldOut,
    updateProduct,
    getProductDetails,
    changeProductsStatusByCategory,
    makeProductAsAvailable,
    reportProduct,
    getReportedProducts,
    getCurrentUserProductsCount,
    getMostActiveTenLocations
}
