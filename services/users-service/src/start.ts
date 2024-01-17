import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { BASE_URL_OF_FRONT_END } from './constants/constants';
import { routes } from './adapters/routes';
import dependencies from './utils/config/dependencies';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: BASE_URL_OF_FRONT_END,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))

app.use(
    session({
      secret: String(process.env.SESSION_SECRET),
      resave: true,
      saveUninitialized: true,
    })
);

app.get( '/', ( req: Request, res: Response) => {
    res.send("ok safeer its working well")
})

app.use("/api/users", routes(dependencies));

app.listen( PORT, () => {
    console.log(`users-service is listening at the port ${PORT}`);
})

export default app;