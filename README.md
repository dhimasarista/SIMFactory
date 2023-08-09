# SIMFactory | ExpressJS-MySQL

## Running the Application
| <strong>Environment</strong> | <strong>DBMS</strong> | 
|----------|----------|
| NodeJS | MySQL/MariaDB |

1. Start MySQL:
   - <b>Windows</b>: If you are using XAMPP, start it as usual, or use PowerShell/CMD and type ```net start mysql```
   - <b>Linux</b>: Open the terminal and type ```sudo systemctl start mysqk```
   - Check the MySQL status with the command  
        - <b>Windows</b>: ````sc query mysql```` 
        - <b>Linux</b>: ```systemctl status mysql```
2. Install all the required modules by running ```npm install```
3. Check Database: ```npm run check_db``` and all tables will automatically created by ```models/```
3. Run the application with the command ```npm start``` or ```npm run dev``` with nodemon.
4. Access the application through the browser by opening http://localhost:3000.