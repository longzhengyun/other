"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(function (request, response) {
    console.log('create a server...');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello world, we use typescript to develop');
    response.end();
});
server.listen(3000, function () {
    console.log('Server listening on port 3000');
    console.log('test...');
});
