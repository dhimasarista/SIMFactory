const unMatchedRoutes = (app) => {
    app.use((req, res, next) => {
        res.status(404).redirect("/error/404")
      })
}

const internalServer = (app) => {
    app.use((req, res, next) => {
        res.status(500).redirect("/error/500");
      })
}

module.exports = {
    unMatchedRoutes,
    internalServer
}