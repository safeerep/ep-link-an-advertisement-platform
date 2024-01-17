import { Request, Response } from "express";

export = ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;

    const getSpecificCategory = async ( req: Request, res: Response) => {
        try {
            // we will get category id in params
            const categoryId = req?.params?.categoryId;
            // we have to pass this category id to the -> usecase -> repo to get details;
            const categoryDetails = await categoryUsecases
            .getSpecificCategory_usecase(dependencies).execute(categoryId)
            if (categoryDetails) {
                return res.json({ success: true, categoryDetails, message: "current category fetch is successfull" })
            }
            else return res.json({ success: false, message: "there is no category with the specified id"})
        } catch (error) {
            console.log(`an error happened during fetching a specific category`);
            return res.status(503).json({ success: false, messsage: "something went wrong" })
        }
    }

    return getSpecificCategory;
} 