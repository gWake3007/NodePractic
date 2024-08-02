import express from 'express';
import { Student } from './models/students.js';

const app = express();

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();

    res.send({ status: 200, data: students });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error!' });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    //?За допомогою деструкторизація з request дістаємо динамічний параметр id.
    const { id } = req.params;
    //?findById() - Повертає або об'єкт який він знайшов або null.
    const student = await Student.findById(id);
    if (student === null) {
      return res
        .status(404)
        .send({ status: 404, message: 'Student not found!' });
    }
    res.send({ status: 200, data: student });
  } catch (error) {
    console.error(error);
  }
});
