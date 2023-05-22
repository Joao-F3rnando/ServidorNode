import { closeDB, openDB } from './configDB.js'

export async function returnName(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT restaurant_name FROM restaurantUserData WHERE ID='${userID.id}'`)
        await closeDB()
        return data 
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function optionsData(userID)
{
    try {
        const db = await openDB()
        const data = await db.get(`SELECT * FROM restaurantUserData WHERE ID='${userID.id}'`)
        await closeDB()
        return data 
    } catch (err) {
        return err
    }
}