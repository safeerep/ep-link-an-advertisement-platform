import { Router } from "express";
import { Dependencies } from "../../utils/types";
import chatRoomRoutes from "./chatRoomRoutes";
import messageRoutes from "./messageRoutes";

export const routes = ( dependencies: Dependencies) => {
    const routes = Router()

    routes.use('/room', chatRoomRoutes(dependencies))
    routes.use('/', messageRoutes(dependencies))

    return routes;
}