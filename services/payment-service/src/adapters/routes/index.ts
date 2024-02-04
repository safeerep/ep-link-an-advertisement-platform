import { Router } from "express";
import paymentRoutes from "./paymentRoutes";
import premiumPolicyRoutes from "./premiumPolicyRoutes";

export const routes = ( dependencies: any) => {
    console.log(dependencies);
    
    const routes = Router()

    routes.use('/', paymentRoutes(dependencies))
    routes.use('/premium', premiumPolicyRoutes(dependencies))

    return routes;
}