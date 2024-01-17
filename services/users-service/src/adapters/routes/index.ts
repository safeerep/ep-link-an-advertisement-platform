import express from 'express'
import userRoutes from './userRoutes'
import adminRoutes from './adminRoutes'

export const routes = ( dependencies: any) => {
    const routes = express.Router()

    routes.use('/user', userRoutes(dependencies))
    routes.use('/admin', adminRoutes(dependencies))

    return routes;
}


