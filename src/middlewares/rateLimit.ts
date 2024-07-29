import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

const applyMiddleware = (middleware: any) => (request: any, response: any) =>
    new Promise((resolve, reject) => {
        middleware(request, response, (result: any) =>
            result instanceof Error ? reject(result) : resolve(result)
        );
    });

const getIP = (request: any) =>
    request.ip ||
    request.headers['x-forwarded-for'] ||
    request.headers['x-real-ip'] ||
    request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
    limit = 10,
    windowMs = 60 * 1000,
    delayAfter = Math.round(10 / 2),
    delayMs = () => 500,
} = {}) => [
        slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
        rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
    ];

const middlewares = getRateLimitMiddlewares();

export const applyRateLimit = async (request: any, response: any, next: any) => {
    await Promise.all(
        middlewares.map(applyMiddleware).map((middleware) => middleware(request, response))
    );
    next();
};
