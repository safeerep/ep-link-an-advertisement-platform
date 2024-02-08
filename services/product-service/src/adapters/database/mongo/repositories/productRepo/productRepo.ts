import { ProductsCollection, ReportedProductsCollection } from "../../schemas";
import { IProduct } from "../../../../../entities/productEntities";
import { IReportedProduct, ReportType } from "../../../../../entities/reportProductEntities";

// to give the details about a certain product
export const getProductDetails = async (productId: string): Promise<IProduct | boolean> => {
    try {
        const productDetails = await ProductsCollection.findById(productId)
        if (productDetails) return productDetails as IProduct;
        else return false;
    } catch (error) {
        console.log(`an error happened during fetching the data about a specific product ${error}`);
        return false;
    }
}

// to add product 
export const addProduct = async (productDetails: any): Promise<IProduct[] | boolean> => {
    try {
        const newProduct = await ProductsCollection.create(productDetails)
        if (newProduct) {
            const products = await ProductsCollection.find({
                status: true,
                categoryWiseStatus: true,
                soldOut: false
            })
            return products as IProduct[];
        }
        else return false;
    } catch (error) {
        console.log(`an error happened during adding a new one product ${error}`);
        return false;
    }
}

// to update (edit) product 
export const updateProduct = async (productId: string, productDetails: any): Promise<IProduct[] | boolean> => {
    try {
        const newProduct = await ProductsCollection.findByIdAndUpdate(productId, {
            ...productDetails
        })
        if (newProduct) {
            const products = await ProductsCollection.find({
                status: true,
                categoryWiseStatus: true,
                soldOut: false
            })
            return products as IProduct[];
        }
        else return false;
    } catch (error) {
        console.log(`an error happened during adding a new one product ${error}`);
        return false;
    }
}

// to ban or release a product by admin
export const changeProductStatus = async (productId: string, status: boolean): Promise<IProduct | boolean> => {
    try {
        const updatedProduct = await ProductsCollection.findByIdAndUpdate(productId,
            {
                status: status
            }, {
            new: true
        }
        )
        if (updatedProduct) return updatedProduct as IProduct;
        else return false
    } catch (error) {
        console.log(`an error happened during changing the status of a particular product ${error}`);
        return false;
    }
}


// to make the product status as sold out
export const makeProductAsSoldOut = async (productId: string): Promise<IProduct | boolean> => {
    try {
        const updatedProduct = await ProductsCollection.findByIdAndUpdate(productId, {
            soldOut: true
        })
        if (updatedProduct) return updatedProduct as IProduct;
        else return false
    } catch (error) {
        console.log(`an error happened during making a product as sold out ${error}`);
        return false;
    }
}

// to make the product status as available
export const makeProductAsAvailable = async (productId: string): Promise<IProduct | boolean> => {
    try {
        const updatedProduct = await ProductsCollection.findByIdAndUpdate(productId, {
            soldOut: false
        })
        if (updatedProduct) return updatedProduct as IProduct;
        else return false
    } catch (error) {
        console.log(`an error happened during making a product as available ${error}`);
        return false;
    }
}

// to get products
export const getProducts = async (): Promise<IProduct[] | boolean> => {
    try {
        const products = await ProductsCollection.find()
        if (products) return products as IProduct[];
        return false;
    } catch (error) {
        console.log(`something went wrong during fetching all the products ${error}`);
        return false;
    }
}


// to get available products
export const getAvailableProducts = async (): Promise<IProduct[] | boolean> => {
    try {
        const products = await ProductsCollection.find({
            status: true,
            categoryWiseStatus: true,
            soldOut: false
        })
        if (products) return products as IProduct[];
        return false;
    } catch (error) {
        console.log(`something went wrong during fetching all the available products ${error}`);
        return false;
    }
}

// to get a specific user's products only
export const getCurrentUserProducts = async (userId: string): Promise<IProduct[] | boolean> => {
    try {
        const products = await ProductsCollection.find({
            userId: userId,
            status: true,
            categoryWiseStatus: true
        })
        if (products) return products as IProduct[];
        return false;
    } catch (error) {
        console.log(`something went wrong during fetching all the products of current user ${error}`);
        return false;
    }
}

// to change the status of the product on category status change;
export const changeProductsStatusByCategory = async (categoryId: string, status: boolean): Promise<boolean> => {
    try {
        const updatedProducts = await ProductsCollection.updateMany({ category: categoryId }, {
            categoryWiseStatus: status
        })
        if (updatedProducts) return true;
        return false;
    } catch (error) {
        console.log(`an error happened during changing products' status based on the category`);
        return false;
    }
}

// to report a product
export const reportProduct = async (productId: string, report: ReportType) => {
    try {
        // first we will look that, this product is reported by anyone before
        const productBeingReported: IReportedProduct | any = await ReportedProductsCollection.findOne({ productId: productId })
        if (productBeingReported) {
            productBeingReported.reports.push(report)
            productBeingReported.save()
            return true;
        }
        else {
            const newReportOnProduct = await ReportedProductsCollection.create({
                productId: productId,
                reports: [report]
            })
            return true;
        }
    } catch (error) {
        console.log(`something went wrong in repo duirng reporting a product ${error}`);
        return false;
    }
}

// to get products ReportedProducts
export const getReportedProducts = async () => {
    try {
        // const reportedProducts = await ReportedProductsCollection.find().populate("productId")
        const reportedProducts = await ReportedProductsCollection.aggregate([
            {
                $unwind: "$reports"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "reportedOn"
                }
            }
        ])

        if (reportedProducts) return reportedProducts;
        return false;
    } catch (error) {
        console.log(`something went wrong during fetching all the products ${error}`);
        return false;
    }
}
