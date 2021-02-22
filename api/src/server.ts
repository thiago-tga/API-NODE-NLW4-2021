import express from "express";

const app = express();
const port = 8080;

app.get('/', (req,resp)=>{
    return resp.send("Hello World - NLW4");
});

app.post('/',(req,resp)=>{
    return resp.json({message: `Os dados foram salvos com sucesso!`})
});

app.listen(port, ()=> console.log("Server is running"));