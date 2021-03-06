import 'dotenv/config';
import Fastify, {
    FastifyInstance,
    FastifyLoggerOptions,
    RouteShorthandOptions,
} from 'fastify';
import cache from '../plugin/cache';

const environment = process.env.NODE_ENV ?? 'development';

// Create a new instance of Fastify.
const loggerOptions: FastifyLoggerOptions = {
    prettyPrint:
        environment === 'development'
            ? {
                  translateTime: 'HH:MM:ss Z',
                  ignore: 'level,hostname',
              }
            : false,
};

const server: FastifyInstance = Fastify({ logger: loggerOptions });

// Register plugins
server.register(cache);

const opts: RouteShorthandOptions = {
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

server.get('/ping', opts, async (request, reply) => {
    console.log(request);

    return { pong: 'it worked' };
});

const start = async () => {
    try {
        await server.listen(3000);

        const address = server.server.address();
        const port = typeof address == 'string' ? address : address?.port;
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
