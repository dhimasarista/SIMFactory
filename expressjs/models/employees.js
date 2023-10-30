const { promisify } = require('util');
const pool = require("../config/database");
const queryAsync = promisify(pool.query).bind(pool);
const batchingData = require("../utils/batchingData");

class EmployeeModel {
    constructor(id){
        this.id = id;
    }

    static async findEmployee(){

    }

    async findById(){
        const query = `SELECT employees.*, departments.name AS department_name FROM employees JOIN departments ON employees.department_id = departments.id WHERE employees.id = ?`;

        try {
            const results = await queryAsync(query, [this.id]);
            return results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = EmployeeModel;