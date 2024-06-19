import { Router } from 'express';
import { getAllStudents, getStudentById } from '../services/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/students', async (req, res, next) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  } catch (err) {
    next(err); // Передаем ошибку дальше для обработки middleware errorHandler
  }
});

router.get('/students/:studentId', async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }
    res.status(200).json({
      data: student,
    });
  } catch (err) {
    next(err); // Передаем ошибку дальше для обработки middleware errorHandler
  }
});

export default router;
