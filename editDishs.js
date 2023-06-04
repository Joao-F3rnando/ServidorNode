import { closeDB, openDB } from './configDB.js'
import { removeFile } from "./saveDrive.js"

export async function getDishs(userID)
{
    try {
        const db = await openDB()
        const data = await db.all(`SELECT ID, dish_name, image FROM menuData WHERE id_restaurant='${userID.id}' LIMIT 100`)
        await closeDB()
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

export async function removeDish(data)
{
    try
    {
        const db = await openDB()
        const image = await db.get(`SELECT image FROM menuData WHERE id='${data.id}'`)
        await db.all(`DELETE FROM menuData WHERE id='${data.id}'`)
        await closeDB()
        removeFile(image.image)
        return JSON.stringify('Prato excluído com sucesso!!!')
    } catch (err){
        return err
    }
}