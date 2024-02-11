import addToFavourites from "./addToFavourites"
import removeFromFavourites from "./removeFromFavourites"
import getAllTheFavourites from "./getAllTheFavourites"
import getFavouriteProducts from "./getFavouriteProducts"


export default ( dependencies: any) => {
    return {
        addToFavouritesController: addToFavourites(dependencies),
        removeFromFavouritesController: removeFromFavourites(dependencies),
        getAllTheFavouritesController: getAllTheFavourites(dependencies),
        getFavouriteProductsController: getFavouriteProducts(dependencies)
    }
}