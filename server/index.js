import  express  from "express";
import loger from "morgan";
import {Server} from "socket.io";
import { createServer } from "http";

import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

const supabaseUrl = 'https://ghiorbbfudumyxigrlpd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoaW9yYmJmdWR1bXl4aWdybHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwODY2OTIsImV4cCI6MjAxODY2MjY5Mn0.CsNlGgXORwNLHjMHjDrrtkQym_V2OcR1FqIe-y1aNZg"
const supabase = createClient(supabaseUrl, supabaseKey)


const app = express();
const port= process.env.PORT ?? 3000;
const server= createServer(app);
const io= new Server(server,{
    connectionStateRecovery: { },
});



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', async (msg) => {
        try {
            // Insert the message into the Supabase database
            const { data, error } = await supabase
                .from('messages')
                .insert([{ message: msg }]);

            if (error) throw error;

            // Optionally, emit the message or a confirmation back to the client
            io.emit('chat message', msg);
        } catch (error) {
            console.error('Error inserting message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.use(loger('dev'));


app.get('/', (req, res) => {  
    res.sendFile(process.cwd() + '/client/index.html');
})
server.listen(port, () => {    
    console.log(`server started at http://localhost:${port}`);
});