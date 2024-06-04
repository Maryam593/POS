import 'dotenv/config'
import express from 'express';
import connectDB from './db/config.js';
import syncDB from './db/init.js';
import AllRoutes from './Routes/index.js';
const posApp = express();
const port = 3000;
posApp.use(express.json());
posApp.use(AllRoutes);
connectDB;
syncDB;
syncDB().then(()=>{
    console.log("DB Added")
})


//listen server 

posApp.listen(port, ()=> {
    console.log(`server is running at port ${port}`)
})