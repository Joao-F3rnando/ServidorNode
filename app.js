import express from "express"
const app = express()
const port = process.env.PORT || 3000
import bodyParser from 'body-parser'
import cors from 'cors'

import { encrypt } from './crypt.js'
import { createAccount } from "./createRestaurante.js"
import { verificationUser } from "./verificationUser.js"
import { getRestaurantId, optionsData, restaurantData, returnName } from "./getData.js"
import { changeData } from "./changeRestaurantData.js"
import { getItemData } from "./getItemData.js"
import { uploadFile } from "./saveDrive.js"
import { upload } from "./configMulter.js"
import { removeDishControl } from "./deleteItemData.js"
import { addItemOnMenu } from "./addItemOnMenu.js"
import { getDishs, removeDish } from "./editDishs.js"
import { returnResearch } from "./returnResearch.js"
import { getMenuData } from "./getMenuData.js"
import { makeAOrder } from "./makeAOrder.js"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', function(req, res){
    res.send("Olá!!!")
})

app.post("/createAccount", async function(req, res)
{
    req.body.password = encrypt(req.body.password)
    res.json(await createAccount(req.body))
})

app.post("/login", async function(req, res)
{  
    res.send(await verificationUser(req.body))
})

app.post("/getRestaurantName", async function(req, res)
{
    res.send(await returnName(req.body))
})

app.post("/getRestaurantData", async function(req, res)
{
    
    res.send(await optionsData(req.body))
})

app.post("/updateData", async function(req, res)
{
    res.send(await changeData(req.body))
})

app.post("/getItensData", async function(req, res)
{
    res.send(await getItemData(req.body))
})

app.post("/getDishData", async function(req, res)
{
    res.json(await getDishs(req.body))
})

app.post("/deleteDish", async function(req, res)
{
    res.json(await removeDish(req.body))
})

app.post("/addItemOnMenu", async function(req, res)
{
    res.json(await addItemOnMenu(req.body))
})

app.post("/removeDishControl", async function(req, res)
{
    res.send(await removeDishControl(req.body))
})

app.post("/searchRestaurants", async function(req, res)
{
    res.json(await returnResearch(req.body.search))
})

app.post("/getRestaurantInfo", async function(req, res)
{
    res.json(await restaurantData(req.body.id))
})

app.post("/getRestaurantId", async function(req, res)
{
    res.json(await getRestaurantId(req.body.idRestaurant))
})

app.post("/getMenuData", async function(req, res)
{
    res.json(await getMenuData(req.body.id_restaurant, req.body.category))
})

app.post("/makeAOrder", async function(req, res)
{
    res.json(makeAOrder(req.body.board, req.body.order))
})

app.post("/savePhoto", upload.single('image'), async(req, res) => {
    const msg = await uploadFile(req.file)
    res.json(msg)
})


app.listen(port, () => {
    console.log(`Entrei!!! Porta Usada: ${port}`)
})