// SSE Endpoint

module.exports = (app) => {
    let executionTime;
    app.use((req, res, next) => {
        const startTime = new Date().getTime();

        res.on("finish", () => {
            const endTime = new Date().getTime();
            executionTime = endTime - startTime;
            req.executionTime = executionTime;
        })

        next();
    });

    app.use((req, res, next) => {
        const memoryUsage = process.memoryUsage.heapUsed() / 1024 / 1024;
        const formattedMemoryUsage = memoryUsage.toFixed(1);

        next();
    });
}