import { openDB } from './configDB.js'

export async function clearTable()
{
    openDB().then(db => {
        db.run('DELETE FROM restaurantUserData');
        db.run("DELETE FROM sqlite_sequence WHERE name='restaurantUserData'");
      });
}

clearTable()