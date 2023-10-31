const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);

class LineTeamTable {
    async findAll(){
        const query = `
        SELECT lt.*, pl.name AS production_line_name, t.name AS team_name, m.name AS models_name
        FROM lines_teams AS lt
        JOIN production_lines AS pl ON lt.production_lines_id = pl.id
        JOIN models AS m ON lt.models_id = m.id
        JOIN teams AS t ON lt.teams_id = t.id
        ORDER BY lt.id`;
        try {
            const results = await queryAsync(query);
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    async changeStatus(){
        let currentHour;
        let currentMinutes;
        let curerentSecond;
        let currentTime;

        const firstShift = "8.0.0";
        const firstShiftEnd = "17.0.0";
        const secondShift = "20.0.0";
        const secondShiftEnd = "5.0.0";



        setInterval( async () => {
            currentHour = new Date().getHours();
            currentMinutes = new Date().getMinutes();
            curerentSecond = new Date().getSeconds();
            currentTime = `${currentHour}.${currentMinutes}.${curerentSecond}`;

            if (currentTime === firstShift) {
                console.log("First Shift, Change Status");
                await queryAsync("UPDATE lines_teams SET status = 'processing' WHERE shift = 1");
            } else if (currentTime === secondShift) {
                await queryAsync("UPDATE lines_teams SET status = 'processing' WHERE shift = 2");
            }

            if (currentTime === firstShiftEnd) {
                console.log("First Shift End, Change Status");
                await queryAsync("UPDATE lines_teams SET status = 'finished' WHERE shift = 1");
                await queryAsync("UPDATE lines_teams SET status = 'waiting' WHERE shift = 2");
            } else if (currentTime === secondShiftEnd) {
                console.log("Second Shift End, Change Status");
                await queryAsync("UPDATE lines_teams SET status = 'finished' WHERE shift = 2");
                await queryAsync("UPDATE lines_teams SET status = 'waiting' WHERE shift = 1");
            }
        }, 1000);
        
    }
}

module.exports = LineTeamTable;