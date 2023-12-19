import  express  from "express";
import loger from "morgan";



const app = express();
const port= process.env.PORT ?? 3000;

app.use(loger('dev'));

app.get('/', (req, res) => {  
    res.send('<h1> Este es el chat</h1>');
})
app.listen(port, () => {    
    console.log(`server started at http://localhost:${port}`);
});