import express from 'express';
import dotenv from 'dotenv';
import { Initapp } from './src/app.js';
dotenv.config()
const app = express()
const port = process.env.PORT
Initapp(app,express)
app.listen(port, () => console.log(`Example app listening on port !`))