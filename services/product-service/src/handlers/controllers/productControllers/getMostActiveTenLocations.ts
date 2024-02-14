import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getMostActiveLocations = async ( req: Request, res: Response) => {
        try {
            // we are going to find top ten active locations;
            const locations = await productUsecases.getMostActiveTenLocations_usecase(dependencies).interactor()
            if (locations) {
                return res.json({ success: true, locations, message: "successfully fetched top ten active locations"})
            }
        } catch (error) {
            console.log(`something went wrong during trying to fetch top ten locations `, error);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getMostActiveLocations;
}