import { openDB } from './configDB.js'

export async function returnName(userID)
{
    console.log(userID)
    try {
        const db = await openDB()
        return await db.get(`SELECT restaurant_name FROM restaurantUserData WHERE ID='${userID.id}'`)
    } catch (err) {
        return err
    }
}