import { openDB } from './configDB.js'

export async function clearTable()
{
  openDB().then(db => {
        db.run('DELETE FROM menuData');
        db.run("DELETE FROM sqlite_sequence WHERE name='menuData'");
      });
}

clearTable()