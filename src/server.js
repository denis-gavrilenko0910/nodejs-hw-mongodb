import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    // app.use(logger);
    app.use('/contacts', contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env('PORT', 4000));

    app.listen(port, () => console.log(`Server is running at port ${port}`));
};