const { promisify } = require('util');
const pool = require("../config/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const getDataEmployee = require("../models/query/getDataEmployee");

class UserModel {
  id;
  username;
  password;
  departmentId;

  // Private Methods
  async #findById(){
    const query = getDataEmployee() + " WHERE employees.id = ?";
    return await queryAsync(query, this.id); // Array of Object
  }

  async #updateUser(){
        const querySelect = `SELECT * FROM users WHERE id = ?`;
        const queryUpdate = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
        

        try {
            const selectData = await queryAsync(querySelect, [this.id]);

            if (!selectData || selectData.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedUsername = this.username || selectData[0].username;
            const updatedPassword = this.password ? await bcrypt.hash(password, 10) : selectData[0].password;

            const updateData = await queryAsync(queryUpdate, [updatedUsername, updatedPassword, this.id]);

            return updateData;
        } catch (error) {
            console.log(error);
        }
  }

  // Public Methods
  findData(handler){
    if (handler === "findById") {
      return this.#findById();
    }
  }

  changeData(handler){
    if (handler === "updateUser"){
      return this.#updateUser();
    }
  }
}

module.exports = UserModel;
