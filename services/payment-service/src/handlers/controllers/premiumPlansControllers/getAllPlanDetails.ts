import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            premiumPlanUsecases
        }
    } = dependencies;

    const getAllPolicies = async ( req: Request, res: Response) => {
        try {
           
            
            const policies = await premiumPlanUsecases
            .getAllPlans_usecase(dependencies).interactor()

            if (policies) {
                return res.json({ success: true, policies, message: "successfully fetched premium policies"})
            }
            return res.status(503).json({ success: false, message: 'something went wrong'})
        } catch (error) {
            console.log(`something went wrong during fetching all policies ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return getAllPolicies;
}