import { closeDB, openDB } from './configDB.js'

export async function changeData(data)
{
    let dbString = 'UPDATE restaurantUserData SET'

    if(data.restaurantName)
    {
        dbString += ` restaurant_name = '${data.restaurantName}',`
    }
    if(data.address)
    {
        dbString += ` address = '${data.address}',`
    }
    if(data.contact)
    {
        dbString += ` contact = '${data.contact}',`
    }
    if(data.time)
    {
        dbString += ` time = '${data.time}',`
    }

    dbString = dbString.slice(0, -1)
    dbString += ` WHERE id = ${data.id}`

    try {
        const db = await openDB()
        await db.run(dbString)
        await closeDB()
        return 'Dados alterados com sucesso'
    } catch (err) {
        console.log(err)
        return err
    }
}