"use strict";
// api/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const app_1 = __importDefault(require("../src/app"));
const database_1 = __importDefault(require("../src/database"));
async function handler(req, res) {
    await (0, database_1.default)();
    return (0, app_1.default)(req, res);
}
