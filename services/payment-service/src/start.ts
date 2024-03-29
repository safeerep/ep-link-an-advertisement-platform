import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { routes } from './adapters/routes';
import dependencies from './utils/config/dependencies';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3004;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))

app.use(session({
    secret: String(process.env.SESSION_SECRET),
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req: Request, res: Response) => {
    res.send('yes safeer payment service is fine')
})

app.use('/api/payment', routes(dependencies))

app.listen( PORT, () => {
    console.log(`payment service started successfully at the port ${PORT}`);
})

export default app;