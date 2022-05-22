"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const environment = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
const loggerOptions = {
    prettyPrint: environment === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'level,hostname',
        }
        : false,
};
const server = (0, fastify_1.default)({ logger: loggerOptions });
const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string',
                    },
                },
            },
        },
    },
};
server.get('/ping', opts, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: 'it worked' };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(3000);
        const address = server.server.address();
        const port = typeof address == 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
        yield server.log.info(`Server running at PORT: ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
