// server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { createStudentSchema } from './validation/students.js';
import router from './routers/index.js';
import HttpError from './middlewares/HttpError.js';
import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

const startServer = () => {
  const app = express();
app.use(cookieParser());
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Пример маршрута с валидацией
  app.post('/students', async (req, res, next) => {
    try {
      await createStudentSchema.validateAsync(req.body, { abortEarly: false });
      // Дальнейшая обработка после успешной валидации
      res.status(201).json({ message: 'Student created successfully' });
    } catch (validationError) {
      next(validationError);
    }
  });

  // Подключение маршрутизатора студентов
 app.use(router);

  // Обработка некорректных маршрутов
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обработки ошибок должен принимать 4 параметра, включая next
  app.use((err, req, res) => {
    if (err instanceof HttpError) {
      res.status(err.status).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export { startServer };

