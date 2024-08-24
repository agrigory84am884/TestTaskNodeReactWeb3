"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./controllers/UserController");
const app = (0, express_1.default)();
const port = 3000;
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [UserController_1.UserController],
    validation: true,
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
