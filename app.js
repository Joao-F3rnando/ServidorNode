const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.send("Olá!!!")
})

app.post("/dado", function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    console.log(req.body)
    console.log("Recebi um dado")
    console.log(req.dado)
    res.send("JSON Recebido!!!")
})

app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})