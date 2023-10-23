const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { green, symbol } = require('../utils/logging');

const Department = require("../models/departments");
const departmentsModel = new Department();

const departmentHandler = {
    render: async (req, res) => {
        
        const user = req.cookies.user;
        const path = req.path;
        try {
            const data = await departmentsModel.findAll();

            res.render("hr_department", {user: user, path, departments: data});
        } catch (error) {
            errorHandling(res, user, path, error);
        }
    },
    addDepartment: async (req, res) => {
        const { name } = req.body;
        try {
            const results = departmentsModel.addData(name);
            res.status(200).send(results);
            console.log(green, `${symbol} Department: ${name} Succesfully Added`);
        } catch (error) {
            errorLogging(error);
        }
    }
}

module.exports = departmentHandler;