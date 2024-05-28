import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { app,io, server } from "./socket/socket";
import authController from "./controllers/authController";
import { CLIENT_URL, PORT } from "./constants";


dotenv.config();
app.use(cors({origin:CLIENT_URL,credentials:true}));
app.use(cookieParser());
app.use(bodyParser.json());

io.on('connection',(Socket)=>{
console.log(Socket);
});

app.use("/auth",authController);
server.listen(PORT,()=>{
    console.log('server is running on port 8181')
})