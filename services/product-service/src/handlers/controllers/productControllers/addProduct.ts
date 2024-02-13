import { Request, Response } from "express";
import productValidationSchema from "../../../utils/validators/productSchemaValidator";
import { ICategory } from "../../../entities/categoryEntities";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases,
            categoryUsecases
        }
    } = dependencies;

    const addProduct = async ( req: Request, res: Response) => {
        try {
            // first we are going to validate the data
            console.log('body',req.body);
            req.body.inputFields = JSON.parse(req.body.inputFields);
            req.body.checkBoxes = JSON.parse(req.body.checkBoxes);
            req.body.radioButtons = JSON.parse(req.body.radioButtons);            
            req.body.images = Array.isArray(req?.files)? 
            (req.files as Express.Multer.File[]).map((file: any) => {
                return file?.location;
              })
            : [];
            
            const productDetails = req.body;
            productValidationSchema.validate(productDetails, { abortEarly: true})
            .then(() => {
                console.log(`validation successful`);
                // so we will continue in next try catch block
            })
            .catch((err: any) => {
                console.log(`data is not in valid structure so `, err);
                return res.json({ success: false, message: 'data is not valid' })
            })
        } catch (error: any) {
            console.log(`an error happened during validation`, error);
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
            // now we verified the data and then we can 
            // we want to set category id with body
            req.body.category = productCategory._id;
            // one more thing needed is userId;
            const token = req.cookies.userJwt;
            req.body.userId = await getUserId(token);

            // when new product is being added we will get the products as newproduct included
            const products = await productUsecases
            .addProduct_usecase(dependencies).interactor(req.body)
            return res.json({ success: true, message: 'successfully added a product', products});
        } catch (error) {
            console.log(`an error happened during adding new product ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return addProduct;
}
