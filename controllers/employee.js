const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const batchingData = require("../utils/batchingData");
const getDataEmployee = require('../models/query/getDataEmployee');
const { errorHandling, errorLogging} = require('../utils/errorHandling');
const fs = require("fs");
const { deletePdfHandler, deleteImageHandler } = require('../utils/uploads/fileUploads');

const employee = {
    renderPage: async (req, res) => {
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
            errorHandling(res, user, path, error);
        }
    },
    addEmployee: async (req, res) => {
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
            errorLogging(error);
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;

        const query = `SELECT employees.*, departments.name AS department_name FROM employees JOIN departments ON employees.department_id = departments.id WHERE employees.id = ?`;
        try {
            const results = await queryAsync(query, [id]);
            res.json(results[0]);
        } catch(error) {
            errorLogging(error);
        }
    },
    deleteById: async (req, res) => {
        const idToDelete = req.params.id;
        const query = `DELETE FROM employees  WHERE employees.id = ?`;

        try {
            const results = await queryAsync(query, [idToDelete]);
            res.status(200).send(results);
            console.log(green, `${symbol} Employee: ${idToDelete} Succesfully Deleted`);
        } catch (error) {
            errorLogging(error);
        }
    },
    updateEmploye: async (req, res) => {
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
                employment_contract 
            } = req.body;
            

            // Kueri
            const queryUsers = `UPDATE users SET department_id = ? WHERE id = ?`;
            const queryEmployee = `SELECT * FROM employees WHERE id = ?`;
            const queryUpdateEmployee = `UPDATE employees SET ? WHERE id = ?`;
            
            const imageFile = photo === undefined ? null : fs.readFileSync(`uploads/images/${photo}`);
            const appLetterFile = application_letter === undefined ? null : fs.readFileSync(`uploads/pdfs/${application_letter}`);
            const CVFile = CV === undefined ? null : fs.readFileSync(`uploads/pdfs/${CV}`);
            
            // Destructing Array of Object
            const [employeeOldData] = await queryAsync(queryEmployee, [idToUpdate]);
            
            // Melakukan update ke tabel users
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
                
                photo: imageFile === null ? employeeOldData.photo : imageFile,
                application_letter: appLetterFile === null ? employeeOldData.application_letter : appLetterFile,
                CV: CVFile === null ? employeeOldData.CV : CVFile,
                portfolio: portfolio === null ? employeeOldData.portfolio : portfolio,
                employment_contract: employment_contract === null ? employeeOldData.employment_contract : employment_contract
            }
            const results = await queryAsync(queryUpdateEmployee, [data, idToUpdate]);
            res.status(200).send(results);

            // Menghapus file setelah upload ke db
            // Untuk sementara file dihapus oleh client ketika halaman di reload
            // if (imageFile) {
            //     deleteImageHandler(photo);
            // }
        } catch (error) {
            errorLogging(error);
        }
    }
}

module.exports = employee;

    // Alur Upload Files (Server):
    // - File yang diupload diclient, langsung dikirim ke direktori server `/uploads/`
    // - Saat client melakukan submit, data yang dikirim adalah nama-nama filesnya.
    //   Kemudian server akan memeriksa apakah file tersebut cocok dengan namanya.
    // - Jika cocok file akan dikirim ke db bersama data-data lainnya.
    // - Dan kemudian file-file yang di direktori uploads langsung dihapus.

    // Problem #2: Upload hanya bisa sekali, jika ditimpa maka akan error(FIXED)
    // Solusi #2: Jangan upload ketika event change, tapi setelah event tersebut
    // dengan pengecekan nilai ada atau tidak, jika ada kirim.

    // Alur upload file (Client): Ketika event change pada input, lakukan pengecekan.
    // Jika files[0] !== undefined, upload ke dir server dan tampilkan button delete.
    // Alur delete file: button delete akan meminta response ke server untuk
    // menghapus file sesuai nama file yang diminta

    // Untuk sementara file dihapus oleh client ketika halaman di reload, sesaat
    // setelah button isConfirmed diklik