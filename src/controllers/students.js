
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
    next(err);
  }
};

export const getStudentByIdController = async ( req,res,next,) => {
const { studentId } = req.params;
const student = await getStudentById(studentId);

if (!student) {
next(new Error('Student not found'));
return;
}

 res.json({
status: 200,
message: `Successfully found student with id ${studentId}!`,
data: student,
});
};
