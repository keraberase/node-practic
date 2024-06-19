
// src/controllers/students.js

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

  try {
    const student = await getStudentById(studentId);

    if (!student) {
      const error = new Error(`Student not found with id ${studentId}`);
      error.status = 404;
      throw error; // Бросаем ошибку, чтобы попасть в блок обработки ошибок
    }

    res.json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  } catch (err) {
    next(err); // Передаем ошибку дальше для обработки middleware errorHandler
  }
};
