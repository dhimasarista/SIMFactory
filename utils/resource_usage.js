const pidusage = require("pidusage");
const { yellow, red, qm } = require("./logging");

const pid = process.pid;

async function displayResourceUsage() {
    try{
        const stats = await pidusage(pid);

        console.log(yellow, `${qm} CPU Usage: ${stats.cpu}%`);
        console.log(yellow, `${qm} Memory Usage: ${stats.memory/1024} MB`);
    }catch(error){
        console.log(red, `${qm} Error getting usage: ${error}`);
    }
}

module.exports = displayResourceUsage;