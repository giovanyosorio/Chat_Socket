import  express  from "express";
import loger from "morgan";
import {Server} from "socket.io";
import { createServer } from "http";


const app = express();
const port= process.env.PORT ?? 3000;
const server= createServer(app);
const io= new Server(server,{
    connectionStateRecovery: { },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');        
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
  })
app.use(loger('dev'));


app.get('/', (req, res) => {  
    res.sendFile(process.cwd() + '/client/index.html');
})
server.listen(port, () => {    
    console.log(`server started at http://localhost:${port}`);
});