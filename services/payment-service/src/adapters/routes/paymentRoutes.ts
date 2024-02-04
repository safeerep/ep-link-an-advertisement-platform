import { Router } from "express";

export default ( dependencies: any) => {
    const router = Router()

    router.get('/', (req, res) => {
        console.log(`its from adapters and its fine`)  
        res.send(`its from adapters and its fine`)    
    })

    return router;
}