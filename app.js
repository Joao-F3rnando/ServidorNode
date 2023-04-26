var express = require("express")
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'bd_novo.db'
var db = new sqlite3.Database(DBPATH)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.send("Olá!!!")
})

app.post("/dado", function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body
    console.log(user)
    console.log("Recebi um dado")
    res.send("JSON Recebido!!!")
})

app.get("/tudo", function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    console.log("Estou aqui!")
    db.all(`SELECT * FROM Usuario`, [], (err, rows) => 
    {
        if(err)
        {
            console.log("aqui 2")
            res.send(err)
        }
        console.log(`Linhas: ${rows}`)
        res.send(rows)
    })
})

app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})