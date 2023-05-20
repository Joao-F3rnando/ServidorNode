import { openDB } from './configDB.js'

export async function createAccount(restaurantData) {
    try {
      const db = await openDB();
      await db.run(
        "INSERT INTO restaurantUserData (email, restaurant_name, cpf_cnpj, password, address, contact, time) VALUES (?,?,?,?,?,?,?)",
        [
          restaurantData.email,
          restaurantData.restaurantName,
          restaurantData.cpf_cnpj,
          restaurantData.password,
          restaurantData.address,
          restaurantData.contact,
          restaurantData.time
        ]
      );
      return {
        response: `${restaurantData.restaurantName} cadastrado com sucesso!!!`,
        status: true
      };
    } catch (err) {
        const error =  err.message.split(": ")[2].split(".")[1]
        console.log(error)
        return error
    }
  }