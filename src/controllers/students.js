
// src/controllers/students.js
import createHttpError from 'http-errors';
import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (err) {
    next(err); // Передаем ошибку дальше для обработки middleware errorHandler
  }
};


export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    // 2. Створюємо та налаштовуємо помилку
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
