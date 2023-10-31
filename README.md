# SIMFactory | Sistem Informasi & Manajemen Produksi

## Requirement
| Backend Framework | Database MS |
| -------- | -------- |
| <strong>Node/ExpressJS</strong> | <strong>MySQL</strong> |

## Running the Application

1. Start MySQL:
   - <b>Windows</b>: If you are using XAMPP, start it as usual, or use PowerShell/CMD and type ```net start mysql```
   - <b>Linux</b>: Open the terminal and type ```sudo systemctl start mysql```
   - Check the MySQL status with the command  
        - <b>Windows</b>: ````sc query mysql```` 
        - <b>Linux</b>: ```systemctl status mysql```
2. Install all the required modules by running ```npm install```
3. Run the application with the command ```npm start``` or ```npm run dev``` with nodemon.
4. Access the application through the browser by opening http://localhost:3000.

### File Naming Rules, Variable/Function, and Class/Struct
> HTML/EJS: nama-elemen

> JS/GOLANG: namaVarFunc, NamaClass, NamaStruct

> SQL: nama_table, nama_kolom