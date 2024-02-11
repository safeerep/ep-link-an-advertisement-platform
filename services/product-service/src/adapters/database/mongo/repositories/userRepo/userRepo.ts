import { IUser } from "../../../../../entities/userEntities";
import { UserCollection } from "../../schemas";

export const addToFavourites = async ( userId: string, productId: string):Promise<boolean> => {
    try {
        await UserCollection.findOneAndUpdate(
            {
                userId: userId
            },
            {
                $addToSet: {
                    favourites: productId
                }
            },
            {
                new: true,
                upsert: true
            }
        )

        return true;
    } catch (error) {
        console.log(`something went wrong during adding a new product to favourites ${error}`);
        return false;
    }
}

export const removeFromFavourites = async ( userId: string, productId: string) :Promise<boolean> => {
    try {
        await UserCollection.findOneAndUpdate(
            {
                userId: userId
            }, {
                $pull: {
                    favourites: productId
                }
            }, {
                new: true
            }
        )

        return true;
    } catch (error) {
        console.log(`something went wrong during removing a product id from a user' document ${error}`);
        return false;
    }
}

export const getAllFavourites = async ( userId: string) => {
    try {
        const userDocument: IUser | null = await UserCollection.findOne({ userId: userId})
        console.log(userDocument?.favourites);
        return userDocument?.favourites;
    } catch (error) {
        console.log(`something went wrong during fetching all the favourites of the current user ${error}`);
        return false;
    }
}

export const getFavourites = async ( userId: string, skip: number, limit: number) => {
    try {

        const userDocumentPopulatedWithFavourites = await UserCollection
        .findOne({ userId: userId}).skip(skip).limit(limit).populate("favourites")

        const userDocument = await UserCollection.findOne({ userId: userId});
        const countOfFavouriteProducts = userDocument?.favourites?.length || 0;

        console.log(userDocumentPopulatedWithFavourites);
        return { 
            favourites: userDocumentPopulatedWithFavourites?.favourites,
            countOfFavouriteProducts
        };
    } catch (error) {
        console.log(`something went wrong during fetching the favourite products ${error}`);
        return false;
    }
}