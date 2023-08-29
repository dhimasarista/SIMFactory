const metrics = (app) => {
    let memoryUsage;
    let executionTime;

    // Menghitung waktu eksekusi
    app.use((req, res, next) => {
        const startTime = new Date().getTime();

        res.on('finish', () => {
            const endTime = new Date().getTime();
            executionTime = endTime - startTime;
            req.executionTime = executionTime;
        });

        // Continue to the next middleware or the main handler
        next();
    });

    // Menghitung penggunaan memori
    app.use((req, res, next) => {
        const memory = process.memoryUsage().heapUsed / (1024 * 1024); // Convert to megabytes
        const formattedMemoryUsage = memory.toFixed(1);
        memoryUsage = formattedMemoryUsage;
        req.memoryUsage = memoryUsage;
        next();
    });

    // SSE endpoint
    app.get('/metrics', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Access-Control-Allow-Origin', 'http://example.com'); // Replace with your allowed origin

        // Send message to the client whenever there is a new log
        function sendLogMessage(message) {
            res.write(`data: ${message}\n\n`);
        }

        // Send execution time log to the client
        sendLogMessage(`${executionTime || 'N/A'} ms/`);
        // Send memory usage log to the client
        sendLogMessage(`${memoryUsage || 'N/A'} MB`);
    });
}


module.exports = metrics;

    // app.get("/metrics", (req, res) => {
    //     let executionTime;
    //     const startTime = new Date().getTime();
    //     res.on("finish", () => {
    //         const endTime = new Date().getTime();
    //         executionTime = endTime - startTime;
    //     });
    
    //     const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    //     const formattedMemoryUsage = memoryUsage.toFixed(1);
    //     const memory = formattedMemoryUsage;
    
    //     res.json({ time: executionTime, memory });
    // });