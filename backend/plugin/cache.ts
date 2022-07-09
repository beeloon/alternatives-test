import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import NodeCache from 'node-cache';

export const cache = async (fastify: FastifyInstance, options: any) => {
    const cache = new NodeCache();
    const CACHE_TTL = 30;

    fastify.addHook(
        'onRequest',
        async (request: FastifyRequest, reply: FastifyReply) => {
            if (request.method === 'GET') {
                const res = cache.get(request.url);

                if (res !== undefined) {
                    reply
                        .code(200)
                        .header(
                            'Content-Type',
                            'application/json; charset=utf-8'
                        )
                        .send(res);
                }
            }
        }
    );

    fastify.addHook(
        'onSend',
        async (request: FastifyRequest, reply: FastifyReply, payload, done) => {
            if (request.method === 'GET') {
                const res = cache.get(request.url);

                if (res === undefined) {
                    cache.set(request.url, payload, CACHE_TTL);
                }
            }

            done();
        }
    );
};

export default fastifyPlugin(cache);
