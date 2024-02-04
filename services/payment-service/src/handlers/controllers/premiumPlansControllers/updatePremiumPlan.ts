import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            premiumPlanUsecases
        }
    } = dependencies;

    const updatePremiumPlan = async ( req: Request, res: Response) => {
        try {
            // we will get policy duration and subscription amount in body
            // it will be a put request;
            console.log(`yes here`);
            console.log(req.body);
            
            const updatePremiumPlan = await premiumPlanUsecases
            .updatePremiumPlan_usecase(dependencies).interactor(req.body)

            if (updatePremiumPlan) {
                return res.json({ success: true, updatePremiumPlan, message: "successfully updated premium plan"})
            }
            return res.status(503).json({ success: false, message: 'something went wrong'})
        } catch (error) {
            console.log(`something went wrong during updating premium plan ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return updatePremiumPlan;
}