import 'dotenv/config'
import express from 'express';
import path from 'path';
import webRoutes from './routes/web.route.js'

const __dirname = import.meta.dirname;

const app = express()

app.use(express.static(path.join(__dirname, '/public')));
//MIDELWARES BODY
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', webRoutes)
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})