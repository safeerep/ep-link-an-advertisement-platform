import { Request, Response } from "express";
import { ICategory } from "../../../entities/categoryEntities";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export = ( dependencies: any) => {
    const {
        usecases: {
            productUsecases,
            categoryUsecases
        }
    } = dependencies;

    const updatedProduct = async ( req: Request, res: Response) => {
        // we should get product id with the update information
        let currentProductToEdit: any;
        try {
            const productId = req.body.productId;
            const existingProduct = await productUsecases
            .getOneSpecificProduct_usecase(dependencies).interactor(productId)
            if (!existingProduct) {
                // if there is no product with this id, it means invalid product id
                return res.json({ success: false, message: "sorry, product is not existing"}) 
            }
            else currentProductToEdit = existingProduct;
        } catch (error) {
            console.log(` an error happened during checking the product is existing or not ${error}`);
            return res.json({ success: false, message: "something went wrong" })
        }

        try {
            // then we have to check that, who is trying to update the details of the product 
            // is it the same user who holds the product, we will let him continue, otherwise no
            // for that, first we have to get current user's id
            const token = req.cookies.userJwt;
            getUserId(token)
            .then((userId: any) => {
                if ( String(userId) !== String(currentProductToEdit?.userId)) {
                    // if its not same, it means user is not authenticated to do the action
                    return res.json({ success: false, message: "user is not authenticated to do it" })
                }
                // else we will continue in the next try catch block
            })
            .catch((err) => {
                console.log(`an error happened during getting current user' id ${err}`);
                return res.json({ success: false, message: "something went wrong"})
            })
        } catch (error) {
            console.log(`some wrong things happened during checking user is authenticated to do it or not ${error}`);
            return res.json({ success: false, message: "something went wrong" })
        }

        try {
            // here we are making the body for ready to save structure
            console.log('body',req.body);
            req.body.inputFields = JSON.parse(req.body.inputFields);
            req.body.checkBoxes = JSON.parse(req.body.checkBoxes);
            req.body.radioButtons = JSON.parse(req.body.radioButtons);            
            req.body.images = Array.isArray(req?.files)? 
            (req.files as Express.Multer.File[]).map((file: any) => {
                return file?.location;
              })
            : [];
        } catch (error: any) {
            console.log(`an error happened during structuring request body`, error);
            return res.json({ success: false, message: 'something went wrong' })
        }

        // here we are declaring the productCategory to get category details for further actions.
        let productCategory: ICategory;
        try {
            // then, we want to check category is existing or not
            const categoryName: string = req?.body?.categoryName;
            const existingCategory = await categoryUsecases
            .checkIsCategoryExisting_usecase(dependencies).interactor(categoryName)
            if (!existingCategory) {
                // if category name is not valid, we will return 
                return res.status(400).json({ success: false, message: 'category name is not valid'})
            }
            else {
                productCategory = existingCategory;
            }
        } catch (error) {
            console.log(`an error happened during checking the category validation ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }

        try {
            // now we verified the data.
            // we want to set category id with body
            req.body.category = productCategory._id;
            // one more thing needed is userId;
            const token = req.cookies.userJwt;
            req.body.userId = await getUserId(token);

            // when new product is being added we will get the products as newproduct included
            const products = await productUsecases
            .updateProduct_usecase(dependencies).interactor( req?.body?.productId, req?.body)
            return res.json({ success: true, message: 'successfully updated product details', products});
        } catch (error) {
            console.log(`an error happened during adding new product ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return updatedProduct;
}
