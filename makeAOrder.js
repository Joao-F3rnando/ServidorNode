import { closeDB, openDB } from './configDB.js'

export async function makeAOrder(board, order)
{
    try {
        const db = await openDB()
        for(let i = 0; i < order.length; i++)
        {
            await db.run("INSERT INTO checkData (id_restaurant, board, dish, obs, quantity) VALUES (?,?,?,?,?)",
            [
                order[i].id_restaurant,
                board,
                order[i].dish,
                order[i].obs,
                order[i].quantity,
            ])
        }
        await closeDB()
        return true
    } catch (error) {
        console.log(error)
        return error
    }
}