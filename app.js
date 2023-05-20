import express from "express"
var app = express()
var port = process.env.PORT || 3000
import bodyParser from 'body-parser'

import { encrypt } from './crypt.js'
import { createAccount } from "./createRestaurante.js"
import { verificationUser } from "./verificationUser.js"
import { optionsData, returnName } from "./getData.js"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.send("Olá!!!")
})

app.post("/createAccount", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    req.body.password = encrypt(req.body.password)
    res.send(await createAccount(req.body))
})

app.post("/login", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    
    res.send(await verificationUser(req.body))
})

app.post("/getRestaurantName", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    res.send(await returnName(req.body))
})

app.post("/getRestaurantData", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    res.send(await optionsData(req.body))
})

app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})