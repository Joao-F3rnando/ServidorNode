import { closeDB, openDB } from './configDB.js'

async function getListID(db, userID)
{
    let id = await db.all(`SELECT GROUP_CONCAT (ID) FROM checkData WHERE id_restaurant= '${userID}'`)
    id = id[0]['GROUP_CONCAT (ID)']
    id = id.split(',')
    id = id.map(valor => parseInt(valor))

    return id
}

export async function getItemData()
{
    const userID = 1
    try {
        const db = await openDB()
        const itens = []
        let ids = await getListID(db, userID)
        const data = await db.all(`SELECT * FROM checkData WHERE id_restaurant='${userID}' LIMIT 100`)
        await closeDB()
        
        for(let i=0; i < ids.length; i++)
        {
            const list = 
            [
                {
                    table: data[i].table,
                    idOfDishe: data[i].ID,
                    dishes:
                    [
                        {

                        }
                    ]
                }
            ]
        }
        // console.log(data)
    } catch (err) {
        console.log(err)
        return err
    }
}

getItemData()