"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = 3002;
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
});
