"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "614541",
    database: "celke",
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});
//# sourceMappingURL=data-source.js.map