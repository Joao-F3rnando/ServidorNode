import { openDB } from './configDB.js'

export async function createAccount(restaurantData) {
    try {
      const db = await openDB();
      await db.run(
        "INSERT INTO restaurantUserData (email, restaurant_name, cpf_cnpj, password, address, contact) VALUES (?,?,?,?,?,?)",
        [
          restaurantData.email,
          restaurantData.restaurantName,
          restaurantData.cpf_cnpj,
          restaurantData.password,
          restaurantData.address,
          restaurantData.contact,
        ]
      );
      return {
        response: `${restaurantData.restaurantName} cadastrado com sucesso!!!`,
        status: true
      };
    } catch (err) {
        return err.message.split(": ")[2].split(".")[1]
    }
  }