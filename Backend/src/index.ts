import { config } from "dotenv";
import app from "./app.js";
import {connectToDatabase} from "./db/connection.js";

//connections and listeneres
const PORT = process.env.PORT || 5000;
config();
connectToDatabase()
    .then(()=> {
        app.listen(PORT,()=>
            console.log("server open & connected to database")
    );
})
.catch((err) => console.log(err));

