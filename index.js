const app = require("./config/express");
const { sequelize } = require("./models");
const http = require('http')

const server = http.createServer(app)


const PORT = 8001

server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    await sequelize.authenticate()
    console.log("Database Connected");
})