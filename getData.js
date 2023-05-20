import { openDB } from './configDB.js'

export async function returnName(userID)
{
    try {
        const db = await openDB()
        return await db.get(`SELECT restaurant_name FROM restaurantUserData WHERE ID='${userID.id}'`)
    } catch (err) {
        return err
    }
}

export async function optionsData(userID)
{
    try {
        const db = await openDB()
        return await db.get(`SELECT * FROM restaurantUserData WHERE ID='${userID.id}'`)
    } catch (err) {
        return err
    }
}