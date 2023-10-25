const { promisify } = require('util');
const pool = require("../config/database");
const queryAsync = promisify(pool.query).bind(pool);

class LineTeam {

    async findAll(){
        const query = `
        SELECT lt.*, pl.name AS production_line_name, t.name AS team_name, m.name AS models_name
        FROM lines_teams AS lt
        JOIN production_lines AS pl ON lt.production_lines_id = pl.id
        JOIN models AS m ON lt.models_id = m.id
        JOIN teams AS t ON lt.teams_id = t.id
        ORDER BY pl.id;`;

        try {
            const results = await queryAsync(query);
            return results;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = LineTeam;