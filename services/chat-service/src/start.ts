import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import express, { Express } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { routes } from './adapters/routes';
import dependencies from './utils/config/dependencies';
import connectSocketIO from './infra/socket/connection';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3003;

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

app.use('/api/chat', routes(dependencies))

const server = http.createServer(app)

server.listen( PORT, () => {
    console.log(`chat service starte successfully at the port ${PORT}`);
})

connectSocketIO(server)

export default app;