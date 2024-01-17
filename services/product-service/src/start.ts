import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from "express";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { routes } from './adapters/routes';
import dependencies from './utils/config/dependencies';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3002;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}
const SessionOptions = {
    secret: String(process.env.SESSION_SECRET),
    resave: true,
    saveUninitialized: true
}
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(session(SessionOptions))
app.use('/products', express.static(path.join( __dirname, "infra", "imageStorage", "products")))

app.get('/', (req: Request, res: Response) => {
    res.send('yes safeer product service is fine')
})

app.use('/api/product', routes(dependencies))

app.listen( PORT, () => {
    console.log(`product-service is running at the port ${PORT}`);
})

export default app;