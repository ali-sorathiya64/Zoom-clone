import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const Connction_string ='mongodb+srv://aasorathiya:nhuDIF2YtIjDTJIQ@cluster0.obszg.mongodb.net/conference-App'
if ( process.env.NODE_ENV === 'production' && ! process.stdin){process.stdin ={ on :()=> {}, resume:() => {} };
}
   

app.set( process.env.PORT || 5000)
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect(process.env.MONGO_URL||Connction_string)

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENIN ON PORT 5000")
    });



}



start();