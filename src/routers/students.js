import { Router } from 'express';
import { getAllStudents, getStudentById } from '../services/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get(
  '/students',
  ctrlWrapper(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  }),
);

router.get(
  '/students/:studentId',
  ctrlWrapper(async (req, res) => {
    const { studentId } = req.params;
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
  }),
);

export default router;
