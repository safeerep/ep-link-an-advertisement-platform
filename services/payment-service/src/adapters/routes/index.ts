import { Router } from "express";
import paymentRoutes from "./paymentRoutes";
import verifyUserAuth from "../../utils/middleWares/checkUserAuth";

export const routes = ( dependencies: any) => {
    const routes = Router()
    
    // we are checking is user is verified or not
    // on before all the routes;
    routes.use(verifyUserAuth)

    routes.use('/', paymentRoutes(dependencies))

    return routes;
}