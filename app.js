import express from "express"
const app = express()
const port = process.env.PORT || 3000
import bodyParser from 'body-parser'

import { encrypt } from './crypt.js'
import { createAccount } from "./createRestaurante.js"
import { verificationUser } from "./verificationUser.js"
import { optionsData, returnName } from "./getData.js"
import { changeData } from "./changeRestaurantData.js"
import { getItemData } from "./getItemData.js"
import { uploadFile } from "./saveDrive.js"
import { upload } from "./configMulter.js"

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

app.post("/updateData", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    res.send(await changeData(req.body))
})

app.post("/getItensData", async function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*")
    res.send(await getItemData(req.body))
})

app.post("/savePhoto", upload.single('image'), async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    console.log(await uploadFile(req.file))
})

app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})