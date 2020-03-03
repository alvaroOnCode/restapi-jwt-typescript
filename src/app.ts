import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import strategy from './middlewares/passport';

import authRouter from './routes/auth';
import protectedRouter from './routes/protected';

// Dotenv
dotenv.config({
    path: path.join(__dirname, './env/.env')
})

// Initializations
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Middleware > Passport
app.use(passport.initialize());
passport.use(strategy);

// Routes
app.use(authRouter);
app.use(protectedRouter);

export default app;