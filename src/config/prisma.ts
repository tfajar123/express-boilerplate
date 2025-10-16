import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        },
        {
            emit: 'event',
            level: 'error'
        },
        {
            emit: 'event',
            level: 'info'
        },
        {
            emit: 'event',
            level: 'warn'
        }
    ],
});

prismaClient.$on('query', (e: any) => {
    logger.error(e)
});

prismaClient.$on('error', (e: any) => {
    logger.error(e)
});