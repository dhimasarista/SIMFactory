const { promisify } = require('util');
const { green, symbol, red } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const batchingData = require("../utils/batchingData");
const getDataEmployee = require('../models/query/getDataEmployee');
const errorHandling = require('../utils/errorHandling');
const fs = require("fs");

class Employee {
    constructor(app){
        this.app = app;
    }

    // Halaman HumanResource/Employee
    getAndRender(){
        this.app.get("/hr/employee", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: hr_employee.ejs

            const employeesQuery = getDataEmployee();
            try {
                let employees = await batchingData({
                    batchSize: 100,
                    queryAsync: queryAsync,
                    query: employeesQuery
                });
                
                // Fetching departments untuk form new-employee
                const departments = await queryAsync("SELECT * FROM departments");
                res.render("hr_employee", {user, path, employees, departments});
            } catch(error) {
                errorHandling(res, error);
            }
        });
    }

    getById(){
        this.app.get("/hr/employee/:id", async (req, res) => {
            const id = req.params.id;

            const query = `SELECT * FROM employees WHERE id = ?`;
            try {
                const result = await queryAsync(query, [id]);
                res.json(result[0]);
            } catch(error) {
                errorHandling(res, error);
            }
        })
    }

    add(){
        this.app.post("/hr/employee", async (req, res) => {
            const { name, department_id } = req.body;
            const resultMaxIdEmployee = await queryAsync("SELECT MAX(id) as maxId FROM employees");
            const currentMaxId = resultMaxIdEmployee[0].maxId || "2000"; // Jike belum ada, mulai dari 00999
            const newId = parseInt(currentMaxId) + 1;
            const data = {
                id: newId,
                name: name,
                department_id: department_id
            }

            try {
                const results = await queryAsync("INSERT INTO employees SET ?", data);
                res.status(200).send(results);
                console.log(green, `${symbol} Employee: ${name} Succesfully Added`);
            } catch (error) {
                errorHandling(res, error);
            }
        });
    }

    delete(){
        this.app.delete("/hr/employee/:id", async (req, res) => {
            const idToDelete = req.params.id;
            const query = `DELETE FROM employees  WHERE employees.id = ?`;

            try {
                const results = await queryAsync(query, [idToDelete]);
                res.status(200).send(results);
                console.log(green, `${symbol} Employee: ${idToDelete} Succesfully Deleted`);
            } catch (error) {
                errorHandling(res, error);
            }
        })
    }

    // Algoritma upload file
    // Ketika file yang dipilih akan langsung dikirim ke server
    // Di dalam direktori `uploads` untuk sementara
    // Jika event submit di trigger,
    // data beserta file akan dikirim ke database
    // kemudian file temporary di `uploads/` 
    // akan dihapus setelah dikirim ke db
    // Jika user melakukan reload, akan ada konfirmasi
    // Jika terkonfirmasi halaman di reload, file akan dihapus dari server

    // Setelah dikirim ke server `uploads`, file akan distamping
    // dalam bentuk angka random, kode tersebut akan menjadi key
    // client menyimpan kode tersebut, saat proses pengiriman data
    // server tinggal mencocokkan kode client dan file yang distamping
    // untuk mengirim file tersebut ke database
    
    update(){
        this.app.put("/hr/employee/:id", async (req, res) => {
            try {
            const idToUpdate = req.params.id;
            const { 
                name, 
                department_id, 
                address, 
                number_phone, 
                email, 
                last_education, 
                major, 
                title, 
                work_experience, 
                skills, 
                mcu, criminal_history,
                // file
                photo,
                application_letter,
                CV,
                portfolio,
                employmentContract 
            } = req.body;

            // Kueri
            const queryUsers = `UPDATE users SET department_id = ? WHERE id = ?`;
            const queryEmployee = `SELECT * FROM employees WHERE id = ?`;
            const query = `UPDATE employees SET ? WHERE id = ?`;
            
            const imageFile = photo === undefined ? null : fs.readFileSync(`uploads/images/${photo}`);
            const appLetterFile = application_letter === undefined ? null : fs.readFileSync(`uploads/pdfs/${application_letter}`);

                // Destructing Array of Object
                const [employeeOldData] = await queryAsync(queryEmployee, [idToUpdate]);
                await queryAsync(queryUsers, [department_id, idToUpdate]);
                const data = {
                    name: name === undefined ? employeeOldData.name : name,
                    department_id: department_id === undefined ? employeeOldData.department_id : parseInt(department_id),
                    address: address === undefined ? employeeOldData.address : address,
                    number_phone: number_phone === undefined ? employeeOldData.number_phone : number_phone,
                    email: email === undefined ? employeeOldData.email : email,
                    last_education: last_education === undefined ? employeeOldData.last_education : last_education,
                    major: major === undefined ? employeeOldData.major : major,
                    title: title === undefined ? employeeOldData.title : title,
                    work_experience: work_experience === undefined ? employeeOldData.work_experience : work_experience,
                    skills: skills === undefined ? employeeOldData.skills : skills,
                    mcu: mcu === undefined ? employeeOldData.mcu : mcu,
                    criminal_history: criminal_history === undefined ? employeeOldData.criminal_history : criminal_history,
                    
                    photo: imageFile === undefined ? employeeOldData.photo : imageFile,
                    // application_letter: appLetterFile === undefined ? employeeOldData.applicationLetter : application_letter,appLetterFile
                    // portfolio: portfolio === undefined ? employeeOldData.portfolio : portfolio,
                    // CV: CV === undefined ? employeeOldData.CV : CV,
                    // employmentContract: employmentContract === undefined ? employeeOldData.employmentContract : employmentContract
                }
                const results = await queryAsync(query, [data, idToUpdate]);
                res.status(200).send(results);
            } catch (error) {
                errorHandling(res, error);
            }
        });
    }
}
class Department{

    constructor(app){
        this.app = app;
    }

    getAndRender(){
        this.app.get("/hr/department",  async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            try {
                
                const query = `
                    SELECT d.*, COALESCE(de.dept_total, 0) AS total_employees
                    FROM departments d
                    LEFT JOIN (
                        SELECT department_id, COUNT(id) AS dept_total
                        FROM employees
                        GROUP BY department_id
                    ) de ON d.id = de.department_id
                `; // ORDER BY d.created_at DESC
                     
                // const departmentsEmployees = await queryAsync("SELECT department.name AS department_name, COUNT(employees.id) AS total_employees FROM departments LEFT JOIN employees USING (id) GROUP BY name")
                const results = await queryAsync(query);
                res.render("hr_department", {user: user, path, departments: results});
            } catch (error) {
                errorHandling(res, error);
            }

        })
    }

    add(){
        this.app.post("/hr/department", async (req, res) => {
            const { name } = req.body;
            const resultMaxIdDepart = await queryAsync("SELECT MAX(id) as maxId FROM departments")
            const maxIdDepart = resultMaxIdDepart[0].maxId || 900;
            const newIdDepart = maxIdDepart + 1;

            const data = {
                id: newIdDepart,
                name: name
            }

            try {
                const query = "INSERT INTO `departments` SET ? ";
                const results = await queryAsync(query, data);
                res.status(200).send(results);
                console.log(green, `${symbol} Department: ${name} Succesfully Added`);
            } catch (error) {
                errorHandling(res, error);
            }
        });
    }
}

module.exports = {
    Employee,
    Department
}